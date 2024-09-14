import { FastifyInstance } from 'fastify';
import { getAvailability ,registerOrUpdateAvailability, getScheduleOverlap} from '../controllers/availabilityController';

export default async function availabilityRoutes(fastify: FastifyInstance) {
    fastify.get('/users/:userId/availability', getAvailability);
    fastify.post('/users/:userId/availability', registerOrUpdateAvailability);
    fastify.get('/users/:userId1/availability/overlap/:userId2', getScheduleOverlap);
}
