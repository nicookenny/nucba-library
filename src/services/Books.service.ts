import { prisma } from '..';
export class BooksService {
	constructor() {}

	public static async create({
		title,
		synopsis,
		type,
		sellPrice,
		loanPrice,
		author,
		categories,
		editorials,
		user,
	}: any) {
		[1, 2, 3];
		try {
			const created = await prisma.book.create({
				include: {
					createdBy: true,
				},
				data: {
					title,
					synopsis,
					type,
					sellPrice,
					loanPrice,
					author: {
						connect: { id: author },
					},
					categories: {
						connect: categories.map((category: any) => ({ id: category })),
					},
					createdBy: {
						connect: {
							id: user,
						},
					},
					editorials: {
						create: editorials.map(({ id, stock }: { id: any; stock: number }) => ({
							stock,
							editorial: {
								connect: {
									id,
								},
							},
						})),
					},
				},
			});

			return { success: true, books: created };
		} catch (error) {
			console.log({ error });
			return { sucess: false, error: 'Hubo un error' };
		}
	}
	public static async getAllBooks() {
		try {
			const books = await prisma.book.findMany({
				include: {
					author: true,
					editorials: {
						select: {
							stock: true,
							editorial: true,
						},
					},
					categories: true,
				},
			});

			return { success: true, books: books };
		} catch (error) {
			console.log({ error });
			return { sucess: false, error: 'Hubo un error' };
		}
	}
	public static async getBookById(id: any) {
		try {
			const book = await prisma.book.findMany({
				where: { id },
				include: {
					author: true,
					categories: true,
				},
			});

			return { success: true, book };
		} catch (error) {
			console.log({ error });
			return { sucess: false, error: 'Hubo un error' };
		}
	}
	public static async updateBookById(id: any, data: any) {
		try {
			const updatedBook = await prisma.book.update({
				where: { id },
				data,
			});

			return { success: true, updatedBook };
		} catch (error) {
			console.log({ error });
			return { sucess: false, error: 'Hubo un error' };
		}
	}
	public static async deleteBookById(id: any) {
		try {
			const deletedBook = await prisma.book.delete({ where: { id } });

			return { success: true, deletedBook };
		} catch (error) {
			console.log({ error });
			return { sucess: false, error: 'Hubo un error' };
		}
	}
}
