import { prisma } from '..';

export class PermissionsService {
	constructor() {}

	public static async create(name: string) {
		try {
			const created = await prisma.permission.create({
				data: {
					name,
				},
			});

			return { success: true, permission: created };
		} catch (error) {
			console.log({ error });
			return { sucess: false, error: 'Hubo un error' };
		}
	}

	public static async assignPermission({ permission, user }: any) {
		try {
			const assigned = await prisma.user.update({
				where: {
					id: user,
				},
				data: {
					permissions: {
						connect: {
							name: permission,
						},
					},
				},
			});

			return { success: true, assigned };
		} catch (error) {
			return { success: false, error: 'Hubo un error' };
		}
	}
}
