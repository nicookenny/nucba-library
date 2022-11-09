import { prisma } from '..';
import { UserRoles } from '../entities/Users/roles.enum';
export class UsersService {
	constructor() {}

	public static async create({ email, profile, password = '' }: any) {
		try {
			const { firstname, lastname, dni, phone, address } = profile;
			const { street, number, zipCode, floor, apartment, city } = address;
			const created = await prisma.user.create({
				data: {
					balance: 0,
					role: UserRoles.CLIENT,
					email,
					password,
					profile: {
						create: {
							firstname,
							lastname,
							dni,
							phone,
							address: {
								create: { street, number, zipCode, floor, apartment, city },
							},
						},
					},
				},
				select: {
					id: true,
					email: true,
					balance: true,
					profile: {
						select: {
							firstname: true,
							lastname: true,
							dni: true,
							phone: true,
							address: {
								select: {
									street: true,
									number: true,
									city: true,
									zipCode: true,
									floor: true,
									apartment: true,
								},
							},
						},
					},
				},
			});

			return { success: true, user: created };
		} catch (error) {
			console.log({ error });
			return { sucess: false, error: 'Hubo un error' };
		}
	}

	public static async getAll() {
		try {
			const data = await prisma.user.findMany({});
			console.log({ data });
			return { success: true, data };
		} catch (error) {
			console.log({ error });
			return { success: false, error: 'Hubo un error' };
		}
	}
	public static async getOneById(id: any) {
		try {
			const data = await prisma.user.findUnique({
				where: { id },
				include: {
					permissions: true,
				},
			});
			return { success: true, data };
		} catch (error) {
			return { success: false, error: 'Hubo un error' };
		}
	}

	public static async getOneByEmail(email: string) {
		try {
			const data = await prisma.user.findUnique({
				where: {
					email,
				},
			});
			if (!data) {
				throw data;
			}
			return { success: true, data };
		} catch (error) {
			console.log({ error });
			return { success: false, error: 'Hubo un error' };
		}
	}

	public static async updateUser() {}

	public static async deleteUser() {}
}
