import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface RegisterUserRequest {
    email: string;
    password: string;
    name: string;
    timeZone?: string;
    slotDuration?: number;
    dayStartTime?: string;
    dayEndTime?: string;
}

export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password, name, timeZone, slotDuration, dayStartTime, dayEndTime } = request.body as RegisterUserRequest;

    try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return reply.status(400).send({ error: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Set default values if not provided
        const defaultTimeZone = timeZone || 'UTC';
        const defaultSlotDuration = slotDuration || 60; // Default to 1 hour
        const defaultDayStartTime = dayStartTime || '08:00';
        const defaultDayEndTime = dayEndTime || '17:00';

        // Create the user in the database
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                timeZone: defaultTimeZone,
                slotDuration: defaultSlotDuration,
                dayStartTime: defaultDayStartTime,
                dayEndTime: defaultDayEndTime,
            },
        });

        // Respond with success
        reply.status(201).send({ 
            message: 'User registered successfully', 
            name: user.name,
            email: user.email,
            userId: user.id,
            slotDuration: user.slotDuration,
            dayStartTime: user.dayStartTime,
            dayEndTime: user.dayEndTime
        });
    } catch (error) {
        console.log("error", error);
        reply.status(500).send({ error: 'Failed to register user' });
    }
};
