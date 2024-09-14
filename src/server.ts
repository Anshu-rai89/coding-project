import buildApp from './app';
import dotenv from 'dotenv';


const startServer = async () => {
    dotenv.config();
    const server = buildApp();

    try {
        const serverPort = Number(process.env.PORT) || 3000 ;
        const serverHost = process.env.HOST || '0.0.0.0';
        await server.listen({ port: serverPort, host: serverHost });
        server.log.info(`Server running at http://localhost:${serverPort}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

startServer();
