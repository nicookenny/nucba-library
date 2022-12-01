import { NextFunction, Request, Response } from 'express';
import { SecurityService } from '../services/security.service';

export const havePermission = (permissions: string[]) => (req: any, res: Response, next: NextFunction) => {
	try {
		const { user } = req;

		const userPermissions = user.groups.flatMap((group: any) =>
			group.permissions.map((permission: any) => permission.name),
		);

		const canContinue = permissions.every((permission: any) => {
			return userPermissions.includes(permission);
		});

		if (!canContinue) {
			throw 'error';
		}

		next();
	} catch (error) {
		next(error);
	}
};
