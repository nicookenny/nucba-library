import { prisma } from '..';

export class EditorialService {
	constructor() {}

	public static async create({ name, phone, email }: any) {
		const created = await prisma.editorial.create({
			data: {
				email,
				name,
				phone,
			},
		});

		return created;
	}

	public static async getAll() {
		return prisma.editorial.findMany();
	}
}
