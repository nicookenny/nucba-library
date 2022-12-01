import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { JWTService } from '../services/jwt.service';
import { UsersService } from '../services/users.service';

export const authenticate = async (req: any, res: Response, next: NextFunction) => {
	try {
		const { authorization } = req.headers;

		if (!authorization || !authorization.startsWith('Bearer ')) {
			throw new UnauthorizedException('No enviaste token');
		}

		const { 1: token } = authorization.split(' ');

		if (!token) {
			throw new UnauthorizedException();
		}

		const { id } = JWTService.verify(token);

		if (!id) {
			throw new UnauthorizedException();
		}

		const { data } = await UsersService.getOneById(id);
		req.user = data;

		next();
	} catch (error: any) {
		next(error);
	}
};
