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
			const data = await prisma.user.findMany();
			return { success: true, data };
		} catch (error) {
			console.log({ error1: error });
			return { success: false, error: 'Hubo un error' };
		}
	}

	public static async getOneById(id: any) {
		try {
			const data = await prisma.user.findUnique({
				where: { id },
				include: {
					purchases: true,
					loans: true,
					profile: true,
					groups: {
						include: {
							permissions: true,
						},
					},
				},
			});
			return { success: true, data };
		} catch (error) {
			console.log({ error });
			return { success: false, error: 'Hubo un error' };
		}
	}

	public static async getOneByEmail(email: any) {
		try {
			const data = await prisma.user.findUnique({
				where: { email },
				include: {
					purchases: true,
					loans: true,
					groups: {
						include: {
							permissions: true,
						},
					},
				},
			});
			return { success: true, data };
		} catch (error) {
			console.log({ error });
			return { success: false, error: 'Hubo un error' };
		}
	}

	public static async updateUser(id: any, data: any) {
		try {
			const user = this.getOneById(id);
			if (!user) {
				throw Error();
			}
			const modified = await prisma.user.update({
				where: { id },
				data: { ...data },
			});
			return { success: true, modified };
		} catch (error) {
			console.log({ error });
			return { success: false, error: 'Hubo un error' };
		}
	}

	public static async deleteUser(id: any) {
		try {
			const deleteUser = await prisma.user.delete({ where: { id }, include: { profile: true } });
			return { success: true, deleteUser };
		} catch (error) {
			console.log({ error });
			return { success: false, error: 'Hubo un error' };
		}
	}

	public static async addBalance(id: any, balance: number) {
		try {
			const addBalance = await this.updateUser(id, { balance });
			return addBalance;
		} catch (error) {
			console.log({ error });
		}
	}
}
