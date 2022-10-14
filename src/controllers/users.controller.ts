import { Request, Response } from 'express';

export class UsersController {
  constructor() {}

  public static async create(req: Request, res: Response) {
    res.status(200).send({ ok: true });
  }
}
