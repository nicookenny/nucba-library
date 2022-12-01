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

	public static async getAll(req: Request, res: Response) {
		try {
			const getData = await UsersService.getAll();
			res.status(getData.success ? 200 : 400).send(getData);
		} catch (error: any) {
			res.status(error.status).json({ error: error.message });
		}
	}
	public static async getById(req: Request, res: Response) {
		const { ID } = req.params;
		const getData = await UsersService.getOneById(ID);
		res.status(getData.success ? 200 : 400).send(getData);
	}

	public static async update(req: Request, res: Response) {
		const { ID } = req.params;
		const update = await UsersService.updateUser(ID, req.body);

		res.status(update.success ? 200 : 400).send(update);
	}

	public static async deleteUser(req: Request, res: Response) {
		const { ID } = req.params;
		const deleteUser = await UsersService.deleteUser(ID);

		res.status(deleteUser.success ? 200 : 400).send(deleteUser);
	}

	public static async addBalance(req: Request, res: Response) {
		const { ID } = req.params;
		const { balance } = req.body;
		const addBalance = await UsersService.addBalance(ID, balance);
		res.status(addBalance?.success ? 200 : 400).send(addBalance);
	}
}
