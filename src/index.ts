import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';

import usersRouter from './routes/users.routes';
import booksRouter from './routes/books.routes';
import authorsRouter from './routes/authors.routes';
import editorialRouter from './routes/editorials.routes';
import sellRouter from './routes/sells.routes';
import loanRouter from './routes/loan.routes';
import categoryRouter from './routes/categories.routes';
import securityRoutes from './routes/security.routes';
import authRoutes from './routes/auth.routes';

import dotenv from 'dotenv';
dotenv.config();

export const prisma = new PrismaClient();

const server = express();

server.use(express.json());
server.use(cors());

server.use('/users', usersRouter);
server.use('/books', booksRouter);
server.use('/authors', authorsRouter);
server.use('/sell', sellRouter);
server.use('/loan', loanRouter);
server.use('/categories', categoryRouter);
server.use('/editorials', editorialRouter);
server.use('/security', securityRoutes);
server.use('/auth', authRoutes);

server.listen(3000, () => {
	console.log('Running on http://localhost:3000');
});
