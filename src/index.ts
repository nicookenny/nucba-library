import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';

import usersRouter from './routes/users.routes';
import booksRouter from './routes/books.routes';
import authorsRouter from './routes/authors.routes';
import categoryRouter from './routes/categories.routes';
import editorialRoutes from './routes/editorials.routes';

import dotenv from 'dotenv';
dotenv.config();

export const prisma = new PrismaClient();

const server = express();

server.use(express.json());
server.use(cors());

server.use('/users', usersRouter);
server.use('/books', booksRouter);
server.use('/authors', authorsRouter);
server.use('/categories', categoryRouter);
server.use('/editorials', editorialRoutes);

server.listen(3000, () => {
	console.log('Running on http://localhost:3000');
});
