import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
	constructor() {}

	public static async register(req: Request, res: Response) {
		const { email, profile, password } = req.body;

		const created = await AuthService.register({
			email,
			password,
			profile,
		});

		res.status(200).send({
			success: true,
			created,
		});
	}

	public static async login(req: Request, res: Response) {
		const { email, password } = req.body;

		const { token, data, error } = await AuthService.login({ email, password });

		if (error) {
			return res.status(500).send({ error });
		}

		res.status(200).send({
			success: true,
			token,
			data,
		});
	}

	public static async validateEmail(req: Request, res: Response) {
		const { token } = req.params;
		const html = await AuthService.validateEmail(token);
		res.send(html);
	}
}
