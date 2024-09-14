import Fastify from 'fastify';
import prismaPlugin from './plugins/prisma';
import apis from './routes';

const buildApp = () => {
    const server = Fastify({
        logger: true,
    });

    // Register plugins
    server.register(prismaPlugin);

    // Register APIS
    server.register(apis);

    return server;
};

export default buildApp;
