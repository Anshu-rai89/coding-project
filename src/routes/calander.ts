import { FastifyInstance } from 'fastify';
import { getCalendarForUser } from '../controllers/calanderController';

export default async function calendarRoutes(fastify: FastifyInstance) {
    fastify.get('/users/:userId/calendar', getCalendarForUser);
}
