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

	public static async get(req: Request, res: Response) {
		console.log({ req });
		const getData = await UsersService.getAll();
		res.status(getData.success ? 200 : 400).send(getData);
	}
	public static async getID(req: Request, res: Response) {
		const { ID } = req.params;
		const getData = await UsersService.getOneById(ID);
		res.status(getData.success ? 200 : 400).send(getData);
	}

	public static async addBalance() {}
}
