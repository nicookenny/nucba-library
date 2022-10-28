import { prisma } from '..';

export class CategoryService {
	constructor() {}

	public static async create(data: any) {
		try {
			const { bookID, ...restData } = data;

			const categoryBook = !!bookID
				? {
						create: [
							{
								book: {
									connect: {
										id: bookID,
									},
								},
							},
						],
				  }
				: {};

			const categories = await prisma.category.create({
				data: {
					...restData,
					books: categoryBook,
				},
			});

			return { success: true, categories };
		} catch (error) {
			console.log({ error });
			return { sucess: false, error: 'Hubo un error' };
		}
	}
	public static async getAllCategory() {
		try {
			const categories = await prisma.category.findMany({
				select: {
					id: true,
					name: true,
					description: true,
					books: true,
				},
			});

			return { success: true, categories };
		} catch (error) {
			return { sucess: false, error: 'Hubo un error' };
		}
	}
	public static async getCategoryById(id: any) {
		try {
			const category = await prisma.category.findUnique({
				where: { id },
				include: {
					books: {},
				},
			});

			return { success: true, category };
		} catch (error) {
			return { sucess: false, error: 'Hubo un error' };
		}
	}
	public static async updateCategoryById(id: any, data: any) {
		try {
			const modified = await prisma.category.update({
				where: { id },
				data: { ...data },
			});

			return { success: true, modified };
		} catch (error) {
			return { sucess: false, error: 'Hubo un error' };
		}
	}
	public static async deleteCategoryById(id: any) {
		try {
			const deleted = await prisma.category.delete({ where: { id } });

			return { success: true, deleted };
		} catch (error) {
			return { sucess: false, error: 'Hubo un error' };
		}
	}
}
