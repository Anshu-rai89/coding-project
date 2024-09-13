import Fastify from 'fastify';
import prismaPlugin from './plugins/prisma';

const buildApp = () => {
    const server = Fastify({
        logger: true,
    });

    // Register plugins
    server.register(prismaPlugin);

    return server;
};

export default buildApp;
