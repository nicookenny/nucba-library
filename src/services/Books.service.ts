import { prisma } from '..';
export class BooksService {
  constructor() {}

  public static async create({ title, synopsis, type, sellPrice, loanPrice, authorID }: any) {
    try {
      const created = await prisma.book.create({
        data: {
          title,
          synopsis,
          type,
          sellPrice,
          loanPrice,
          author: {
            connect: { id: authorID },
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
          author: {},
        },
      });

      return { success: true, books: books };
    } catch (error) {
      console.log({ error });
      return { sucess: false, error: 'Hubo un error' };
    }
  }
  public static async getBookById(id: number) {
    try {
      const book = await prisma.book.findMany({
        where: { id },
        include: {
          author: {},
        },
      });

      return { success: true, book };
    } catch (error) {
      console.log({ error });
      return { sucess: false, error: 'Hubo un error' };
    }
  }
  public static async updateBookById(id: number, data: any) {
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
  public static async deleteBookById(id: number) {
    try {
      const deletedBook = await prisma.book.delete({ where: { id } });

      return { success: true, deletedBook };
    } catch (error) {
      console.log({ error });
      return { sucess: false, error: 'Hubo un error' };
    }
  }
}
