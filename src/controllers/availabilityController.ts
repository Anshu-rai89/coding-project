import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';
import { upsertAvailabilityWithSlots } from '../services/slotService';
import { getAvailabilityWithSlots,findScheduleOverlap } from '../services/availablity';

const prisma = new PrismaClient();

export const getAvailability = async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.params as { userId: string };
    const { date } = request.query as { date: string };

    try {
        const availability = await getAvailabilityWithSlots(parseInt(userId), date);

        if (!availability) {
            return reply.status(404).send({ error: 'Availability not found' });
        }

        reply.status(200).send(availability);
    } catch (error) {
        reply.status(500).send({ error: 'Failed to fetch availability and slots' });
    }
};


export const registerOrUpdateAvailability = async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.params as { userId: string };
    const { date } = request.body as { date: string };

    try {
        // Fetch user preferences for slot duration and time range
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
        });

        if (!user) {
            return reply.status(404).send({ error: 'User not found' });
        }

        // Ensure the selected date is greater than the current date
        const today = new Date();
        const selectedDate = new Date(date);
        if (selectedDate <= today) {
            return reply.status(400).send({ error: 'Selected date must be greater than the current date' });
        }

        // Upsert availability and slots based on user preferences
        await upsertAvailabilityWithSlots(
            parseInt(userId),
            date,
            user.dayStartTime,
            user.dayEndTime,
            user.slotDuration
        );

        reply.status(201).send({ message: 'Availability and slots upserted successfully' });
    } catch (error) {
        console.log("Error", error);
        reply.status(500).send({ error: 'Failed to upsert availability and slots' });
    }
};


export const getScheduleOverlap = async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId1, userId2 } = request.params as { userId1: string; userId2: string };
    const { date } = request.query as { date: string };

    try {

       const user1 = await prisma.user.findUnique({
            where: { id: userId1 },
        });

        const user2 = await prisma.user.findUnique({
            where: { id: userId2 },
        });

        if (!user1 || !user2) {
            return reply.status(404).send({ error: 'User not found' });
        }
        const overlapSlots = await findScheduleOverlap(parseInt(userId1), parseInt(userId2), date);

        if (overlapSlots.length === 0) {
            return reply.status(200).send({ message: 'No overlapping slots found', overlaps: [] });
        }

        reply.status(200).send({ overlaps: overlapSlots });
    } catch (error) {
        reply.status(500).send({ error: 'Failed to fetch schedule overlap' });
    }
};


