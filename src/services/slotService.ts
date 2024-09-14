
import { PrismaClient } from '@prisma/client';
import { generateSlots } from '../utils/slotUtils';

const prisma = new PrismaClient();

// Function to upsert availability with slots for a specific day
export const upsertAvailabilityWithSlots = async (
    userId: number,
    date: string,
    startTime: string,
    endTime: string,
    slotDuration: number
) => {
    // Generate time slots based on the given parameters
    const slots = generateSlots(startTime, endTime, slotDuration);

    // Upsert the availability record (update if exists, or create new)
    const availability = await prisma.availability.upsert({
        where: {
            userId_date: {
                userId,
                date: new Date(date),
            },
        },
        update: {
            isAvailable: true,
        },
        create: {
            userId,
            date: new Date(date),
            isAvailable: true,
        },
    });

    // Upsert each slot based on availability, startTime, and endTime
    const slotPromises = slots.map((slot) =>
        prisma.slot.upsert({
            where: {
                availabilityId_startTime_endTime: {
                    availabilityId: availability.id,
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                },
            },
            update: {
                available: true, 
                isDeleted: false,
            },
            create: {
                date: new Date(date),
                startTime: slot.startTime,
                endTime: slot.endTime,
                userId: userId,
                available: true,
                isDeleted: false,
                availabilityId: availability.id,
            },
        })
    );

    // Perform all upsert operations in parallel
    await Promise.all(slotPromises);
};


