#!/bin/sh

# Run Prisma migrations
npx prisma migrate deploy

# Start the Fastify server
npm run start
