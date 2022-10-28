import { Request, Response } from 'express';
import { EditorialService } from '../services/editorials.service';

export class EditorialController {
	constructor() {}

	public static async create(req: Request, res: Response) {
		const createdEditorial = await EditorialService.create(req.body);
		res.status(200).send({ success: true, editorial: createdEditorial });
	}

	public static async getAll(req: Request, res: Response) {
		const editorials = await EditorialService.getAll();

		res.status(200).send({ success: true, editorials });
	}
}
