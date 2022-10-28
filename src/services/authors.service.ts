import { prisma } from '..';

export class AuthorService {
	constructor() {}

	public static async create(data: any) {
		try {
			const author = await prisma.author.create({ data: { ...data } });

			return { success: true, author };
		} catch (error) {
			console.log({ error });
			return { sucess: false, error: 'Hubo un error' };
		}
	}
	public static async getAllAuthors() {
		try {
			const authors = await prisma.author.findMany({
				include: {
					books: true,
				},
			});

			return { success: true, authors };
		} catch (error) {
			return { sucess: false, error: 'Hubo un error' };
		}
	}
	public static async getAuthorById(id: any) {
		try {
			const author = await prisma.author.findUnique({ where: { id } });

			return { success: true, author };
		} catch (error) {
			return { sucess: false, error: 'Hubo un error' };
		}
	}
	public static async updateAuthorById(id: any, data: any) {
		try {
			const modified = await prisma.author.update({
				where: { id },
				data: { ...data },
			});

			return { success: true, modified };
		} catch (error) {
			return { sucess: false, error: 'Hubo un error' };
		}
	}
	public static async deleteAuthorById(id: any) {
		try {
			const deleted = await prisma.author.delete({ where: { id } });

			return { success: true, deleted };
		} catch (error) {
			return { sucess: false, error: 'Hubo un error' };
		}
	}
}
