# Farcana Test Task backend API

This project is built using Express.js, TypeScript, Sequelize, and PostgreSQL

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v14.x or later)
- npm (v6.x or later)
- Docker for the database

## Setup

Follow these steps to get your development environment set up:

# For the sake of the testing task .env file contains all neccessary environment variables. But .env.local example is provided to show a hypothetical developer instructions what variables are needed to be defined

1. Define environment variables (already defined)

2. After you cloned repository install dependencies of the project

### `npm install`

3. Build and run docker container for the database:

### `docker-compose up --build`

4. While database container is up and running, run database migrations:

### `npm run migrate`

5. Start development server:

### `npm run dev`
