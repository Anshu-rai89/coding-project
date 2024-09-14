# Calendar API

## [PROD] API Base URL 
 https://coding-project-9f39.onrender.com/api/v1/ 
 Note: In case of 502 retry after 50s (Free version limitation)

## Features
- User registration with customizable timezone, slot duration, and working hours.
- Users can create availability for any future date with defined slots (1 hour, 30 minutes, or 15 minutes).

- API to retrieve availability and slots for a specific user.

- API to find overlapping availability slots between two users on a given day.

## Overview

This is a Fastify-based API built using TypeScript, Prisma, and PostgreSQL. The API allows users to set their availability in slots for each day, view their availability, and find overlapping availability slots between two users.

## Tech Stack

- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Containerization**: Docker

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed and running
- [Docker Compose](https://docs.docker.com/compose/install/) installed

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Anshu-rai89/coding-project.git
cd coding-project

```

### 2. Build and Start the Docker Containers
Build the Docker images and start the containers using Docker Compose

```bash
docker-compose up --build

```


# API Documentation

## Overview

This document provides an overview of the available API endpoints for managing user registrations, availability, and scheduling. The API is built using Fastify, TypeScript, Prisma, and PostgreSQL.

## Base URL

The base URL for all API endpoints is: http://127.0.0.1:8000/api/v1

## User API

### Register User

- **Endpoint**: `POST /user/register`

## Calender API

### Get user calender

- **Endpoint**: `GET users/:userId/calendar`

## Availability API

### Get user availability for day

- **Endpoint**: `GET users/:userId/availability`

### Create user availability for a day

- **Endpoint**: `POST users/:userId/availability`

### Find overlap in availability for two user

- **Endpoint**: `GET users/:userId1/availability/overlap/userId2`







