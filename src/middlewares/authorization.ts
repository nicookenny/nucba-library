import { NextFunction, Request, Response } from 'express';
import { PermissionsService } from '../services/permissions.service';

export const havePermission = (permissions: string[]) => (req: any, res: Response, next: NextFunction) => {
	try {
		const { user } = req;

		const userPermissions = user.permissions.map((permission: any) => permission.name);

		// ["PRESTAMOS/ANULAR","USUARIOS/VER_LISTADO"]

		const canContinue = permissions.every((permission) => {
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
