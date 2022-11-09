import { NextFunction, Request, Response } from 'express';
import { JWTService } from '../services/jwt.service';
import { UsersService } from '../services/users.service';

export const authenticate = async (req: any, res: Response, next: NextFunction) => {
	try {
		const { authorization } = req.headers;

		if (!authorization || !authorization.startsWith('Bearer ')) {
			throw 'error';
		}

		//"Bearer "
		// ["Bearer "]

		const { 1: token } = authorization.split(' ');

		if (!token) {
			throw 'error';
		}

		const { id } = JWTService.verify(token);

		const { data } = await UsersService.getOneById(id);
		req.user = data;

		next();
	} catch (error) {
		next(error);
	}
};
