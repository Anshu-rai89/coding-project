import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';

const prisma = new PrismaClient();

// Get calendar view of all availability for a user
export const getCalendarForUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.params as { userId: string };

    try {
        const availability = await prisma.availability.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { date: 'asc' },
        });

        return reply.send(availability);
    } catch (error) {
        reply.status(500).send({ error: 'Unable to fetch calendar' });
    }
};
