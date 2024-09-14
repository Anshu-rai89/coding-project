import { FastifyInstance } from 'fastify';
import { registerUser } from '../controllers/userController';
import { registerUserSchema } from '../schema/user';

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/register', {schema: registerUserSchema},registerUser);
}
