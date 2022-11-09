import { Request, Response } from 'express';
import { prisma } from '..';
import { PermissionsService } from '../services/permissions.service';

export class PermissionController {
	constructor() {}

	public static async create(req: Request, res: Response) {
		try {
			const { name } = req.body;
			const created = await PermissionsService.create(name);

			return res.status(201).json({ success: true, permission: created });
		} catch (error) {
			return res.status(500).json({ sucess: false, error: 'Hubo un error' });
		}
	}

	public static async assignPermission(req: Request, res: Response) {
		try {
			const { permission } = req.body;
			const { user } = req.params;
			const assigned = await PermissionsService.assignPermission({ permission, user });

			return res.status(201).json({ success: true, assigned });
		} catch (error) {
			return res.status(500).json({ success: false, error: 'Hubo un error' });
		}
	}
}
