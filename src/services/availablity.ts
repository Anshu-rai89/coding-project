
import { PrismaClient } from '@prisma/client';
import { Slot } from '../types/slot';
import { calculateRangeOverlap } from '../utils/slotUtils';


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


export async function findMergedAvailabilityOverlaps(userId1: number, userId2: number, date: Date) {
    // Fetch availability and slots for both users on the specified date
    const [availability1, availability2] = await Promise.all([
        prisma.availability.findUnique({
            where: { userId_date: { userId: userId1, date } },
            include: { slots: true },
        }),
        prisma.availability.findUnique({
            where: { userId_date: { userId: userId2, date } },
            include: { slots: true },
        }),
    ]);

    // If either user is not available on this day, return an empty array
    if (!availability1?.isAvailable || !availability2?.isAvailable) {
        return [];
    }

    return calculateRangeOverlap(availability1.slots, availability2.slots);
}



