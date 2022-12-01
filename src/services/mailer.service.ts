import { createTransport } from 'nodemailer';

export class MailerService {
	constructor() {}

	static async send(message: string, to: string) {
		try {
			const transporter = createTransport({
				service: 'gmail',
				auth: {
					user: 'nucbalib1817@gmail.com',
					pass: 'pprusxyraoremvqs',
				},
			});

			const mail = await transporter.sendMail({
				to,
				subject: 'TEST',
				html: message,
			});

			return mail;
		} catch (error) {
			console.log({ error });
		}
	}
}
