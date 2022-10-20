import { Request, Response } from 'express';
import { AuthorService } from '../services/authors.service';

export class AuthorsController {
  constructor() {}

  public static async create(req: Request, res: Response) {
    const created = await AuthorService.create(req.body);

    res.status(created.success ? 201 : 400).send(created);
  }

  public static async getAllAuthors(_req: Request, res: Response) {
    const authors = await AuthorService.getAllAuthors();
    res.status(authors.success ? 200 : 404).send(authors);
  }
  public static async getAuthorById(req: Request, res: Response) {
    const author = await AuthorService.getAuthorById(+req.params.id);
    res.status(author.success ? 200 : 404).send(author);
  }
  public static async updateAuthorById(req: Request, res: Response) {
    const modified = await AuthorService.updateAuthorById(+req.params.id, req.body);
    res.status(modified.success ? 200 : 404).send(modified);
  }
  public static async deleteAuthorById(req: Request, res: Response) {
    const deleted = await AuthorService.deleteAuthorById(+req.params.id);
    res.status(deleted.success ? 200 : 404).send(deleted);
  }
}
