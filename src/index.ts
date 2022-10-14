import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';

import usersRouter from './routes/users.routes';

import dotenv from 'dotenv';
dotenv.config();

export const prisma = new PrismaClient();

const server = express();

server.use(express.json());
server.use(cors());

server.use('/users', usersRouter);

server.listen(3000, () => {
  console.log('Running on http://localhost:3000');
});
