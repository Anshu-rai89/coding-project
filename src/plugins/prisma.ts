import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default fp(async (server) => {
    server.decorate('prisma', prisma);

    // Ensure Prisma disconnects when the server shuts down
    server.addHook('onClose', async (serverInstance) => {
        await serverInstance.prisma.$disconnect();
    });
});
