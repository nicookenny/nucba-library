import { compare, genSalt, hash } from 'bcrypt';
import { JWTService } from './jwt.service';
import { UsersService } from './users.service';
export class AuthService {
	constructor() {}

	public static async register(data: any) {
		try {
			const { profile, email, password } = data;

			const candidate = await UsersService.getOneByEmail(email);
			if (candidate.data) {
				throw candidate;
			}

			const salt = await genSalt(10);
			const encrypted = await hash(password, salt);

			const { user } = await UsersService.create({ profile, email, password: encrypted });

			return user;
		} catch (error) {
			console.log({ error });
			return null;
		}
	}
	public static async login({ email, password }: any) {
		const { data } = await UsersService.getOneByEmail(email);

		if (!data) {
			throw data;
		}

		const isValid = await compare(password, data.password);

		if (!isValid) {
			throw isValid;
		}
		const { id, balance } = data;
		const token = JWTService.generate({
			id,
			email,
		});

		return {
			success: true,
			token,
			data: {
				email,
				balance,
			},
		};
	}
}
