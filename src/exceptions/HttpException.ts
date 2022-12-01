export class HttpException extends Error {
	public status: number;
	public message: string;
	public error?: string;

	constructor(status: number, message: string, error?: string) {
		super(message);
		this.status = status;
		this.error = error;
		this.message = message;
	}
}
