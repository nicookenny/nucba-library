import { prisma } from '..';

export class SecurityService {
	constructor() {}

	public static async createSecurityGroup(name: string) {
		try {
			const created = await prisma.permissionGroup.create({
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

	public static async createPermission(name: string) {
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

	public static async getPermissions() {
		try {
			const permissions = await prisma.permission.findMany();
			return { success: true, permissions };
		} catch (error) {
			console.error(error);
			return { success: false, error: 'Hubo un error' };
		}
	}

	public static async getGroups() {
		try {
			const groups = await prisma.permissionGroup.findMany({
				include: {
					permissions: {
						select: {
							name: true,
						},
					},
				},
			});
			return { success: true, groups };
		} catch (error) {
			console.error(error);
			return { success: false, error: 'Hubo un error' };
		}
	}
	public static async asignPermissionsToGroup(group: string, permissions: string[]) {
		try {
			const updated = await prisma.permissionGroup.update({
				where: {
					id: group,
				},
				data: {
					permissions: {
						connect: permissions.map((permission) => ({ name: permission })),
					},
				},
			});
			return {
				success: true,
				updated,
			};
		} catch (error) {
			console.error(error);
			return { success: false, error: 'Hubo un error' };
		}
	}

	public static async assignGroupsToUser(user: string, groups: string[]) {
		try {
			const updated = await prisma.user.update({
				where: {
					id: user,
				},
				data: {
					groups: {
						connect: groups.map((group) => ({ id: group })),
					},
				},
			});
			return {
				success: true,
				updated,
			};
		} catch (error) {
			console.error(error);
			return { success: false, error: 'Hubo un error' };
		}
	}
}
