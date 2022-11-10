import * as jwt from 'jsonwebtoken';

export class JWTService {
	constructor() {}

	public static generate(payload: any) {
		return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '5m' });
	}

	public static verify(token: string) {
		return jwt.verify(token, process.env.JWT_SECRET!) as any;
	}
}
