import { Request, Response } from 'express';
import { UserRoles } from '../entities/Users/roles.enum';
import { UsersService } from '../services/users.service';

export class UsersController {
  constructor() {}

  public static async create(req: Request, res: Response) {
    const { email, profile } = req.body;
    const { firstname, lastname, dni, phone, address } = profile;
    const { street, number, zipCode, floor, apartment, city } = address;

    const created = await UsersService.create({
      email,
      profile: {
        firstname,
        lastname,
        dni,
        phone,
        address: {
          street,
          number,
          zipCode,
          floor,
          apartment,
          city,
        },
      },
    });

    res.status(created.success ? 200 : 400).send(created);
  }
}
