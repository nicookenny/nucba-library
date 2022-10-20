import { Request, Response } from 'express';
import { BooksService } from '../services/Books.service';

export class BooksController {
  constructor() {}

  public static async create(req: Request, res: Response) {
    const { title, synopsis, type, sellPrice, loanPrice, authorID } = req.body;

    const created = await BooksService.create({
      title,
      synopsis,
      type,
      sellPrice,
      loanPrice,
      authorID,
    });

    res.status(created.success ? 201 : 400).send(created);
  }
  public static async getAllBooks(_req: Request, res: Response) {
    const books = await BooksService.getAllBooks();

    res.status(books.success ? 200 : 404).send(books);
  }
  public static async getBookById(req: Request, res: Response) {
    const book = await BooksService.getBookById(+req.params.id);

    res.status(book.success ? 200 : 404).send(book);
  }
  public static async updateBookById(req: Request, res: Response) {
    const updatedBook = await BooksService.updateBookById(+req.params.id, req.body);

    res.status(updatedBook.success ? 200 : 404).send(updatedBook);
  }
  public static async deleteBookById(req: Request, res: Response) {
    const deletedBook = await BooksService.deleteBookById(+req.params.id);

    res.status(deletedBook.success ? 200 : 404).send(deletedBook);
  }
}
