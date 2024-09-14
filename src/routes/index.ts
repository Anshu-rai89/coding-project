import calendarRoutes from "./calander";
import availabilityRoutes from './availability';
import userRoutes from "./user";
import { FastifyInstance } from "fastify";

export default async function apis(fastify: FastifyInstance) {
    fastify.register(calendarRoutes,{prefix: 'api/v1'});
    fastify.register(availabilityRoutes, { prefix: 'api/v1' });
    fastify.register(userRoutes, { prefix: 'api/v1/users' })
}