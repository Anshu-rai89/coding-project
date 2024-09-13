import buildApp from './app';
import dotenv from 'dotenv';


const startServer = async () => {
    dotenv.config();
    const server = buildApp();

    try {
        const serverPort = Number(process.env.PORT) || 3000 
        await server.listen({ port: serverPort });
        server.log.info(`Server running at http://localhost:${serverPort}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

startServer();
