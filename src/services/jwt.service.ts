import * as jwt from 'jsonwebtoken';

export class JWTService {
	constructor() {}

	public static generate(payload: any, expiresIn?: string) {
		return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: expiresIn ?? '5m' });
	}

	public static verify(token: string) {
		return jwt.verify(token, process.env.JWT_SECRET!) as any;
	}
}
