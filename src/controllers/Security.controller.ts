import { Request, Response } from 'express';
import { prisma } from '..';
import { SecurityService } from '../services/security.service';

export class SecurityController {
	constructor() {}

	public static async createPermission(req: Request, res: Response) {
		try {
			const { name } = req.body;
			const created = await SecurityService.createPermission(name);

			return res.status(201).json(created);
		} catch (error) {
			return res.status(500).json({ sucess: false, error: 'Hubo un error' });
		}
	}

	public static async getPermissions(req: Request, res: Response) {
		try {
			const permissions = await SecurityService.getPermissions();

			return res.status(200).json(permissions);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	public static async getGroups(req: Request, res: Response) {
		try {
			const groups = await SecurityService.getGroups();

			return res.status(200).json(groups);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	public static async createGroup(req: Request, res: Response) {
		try {
			const { name } = req.body;
			const created = await SecurityService.createSecurityGroup(name);

			return res.status(201).json(created);
		} catch (error) {
			return res.status(500).json({ sucess: false, error: 'Hubo un error' });
		}
	}

	public static async assignPermissionsToGroup(req: Request, res: Response) {
		try {
			const { permissions } = req.body;
			const { id } = req.params;
			const assigned = await SecurityService.asignPermissionsToGroup(id, permissions);

			return res.status(201).json(assigned);
		} catch (error) {
			return res.status(500).json({ sucess: false, error: 'Hubo un error' });
		}
	}

	public static async assignGroupsToUser(req: Request, res: Response) {
		try {
			const { groups } = req.body;
			const { id } = req.params;
			const assigned = await SecurityService.assignGroupsToUser(id, groups);

			return res.status(201).json(assigned);
		} catch (error) {
			return res.status(500).json({ sucess: false, error: 'Hubo un error' });
		}
	}
}
