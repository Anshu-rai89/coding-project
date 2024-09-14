
import { PrismaClient } from '@prisma/client';
import { Slot,OverlapSlot } from '../types/slot';
import { findSlotOverlap } from '../utils/slotUtils';


const prisma = new PrismaClient();

export const getAvailabilityWithSlots = async (userId: number, date: string) => {
    const availability = await prisma.availability.findUnique({
        where: {
            userId_date: {
                userId,
                date: new Date(date),
            },
        },
        include: {
            slots: true, // Include the slots associated with the availability
        },
    });

    if (availability) {
        // Sort slots by startTime
        availability.slots.sort((a:Slot, b:Slot) => {
            const timeA = a.startTime.split(':').map(Number);
            const timeB = b.startTime.split(':').map(Number);
            return timeA[0] - timeB[0] || timeA[1] - timeB[1]; // Compare hours and then minutes
        });
    }

    return availability;
};


// Function to get slots for a user on a specific date
async function getUserSlots(userId: number, date: string): Promise<Slot[]> {
    const availability = await prisma.availability.findUnique({
        where: {
            userId_date: {
                userId,
                date: date ? new Date(date): new Date(Date.now()),
            },
        },
        include: {
            slots: {
                orderBy: {
                    startTime: 'asc',
                },
            },
        },
    });

    return availability ? availability.slots : [];
}

// Function to find overlaps between two users' slots
export const findScheduleOverlap = async (userId1: number, userId2: number, date: string): Promise<OverlapSlot[]> => {
    const user1Slots = await getUserSlots(userId1, date);
    const user2Slots = await getUserSlots(userId2, date);

    const overlapSlots: OverlapSlot[] = [];

    user1Slots.forEach(slot1 => {
        user2Slots.forEach(slot2 => {

            if(slot1.available && slot2.available) {
                const overlap = findSlotOverlap(slot1, slot2);
                if (overlap) {
                    overlapSlots.push(overlap);
                }
            }  
        });
    });

    return overlapSlots;
};



