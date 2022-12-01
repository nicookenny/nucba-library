"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = require("bcrypt");
const unauthorized_exception_1 = require("../exceptions/unauthorized.exception");
const jwt_service_1 = require("./jwt.service");
const mailer_service_1 = require("./mailer.service");
const users_service_1 = require("./users.service");
const handlebars_1 = __importDefault(require("handlebars"));
class AuthService {
    constructor() { }
    static register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { profile, email, password } = data;
                const candidate = yield users_service_1.UsersService.getOneByEmail(email);
                if (candidate.data) {
                    throw candidate;
                }
                const salt = yield (0, bcrypt_1.genSalt)(10);
                const encrypted = yield (0, bcrypt_1.hash)(password, salt);
                const { user } = yield users_service_1.UsersService.create({ profile, email, password: encrypted });
                const validateToken = jwt_service_1.JWTService.generate({ email, id: user === null || user === void 0 ? void 0 : user.id }, '15m');
                const mail = handlebars_1.default.compile(`<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Document</title>
			</head>
			<body>
			Ingresa a este link para validar tu correo: <b>{{url}}</b>
			</body>
			</html>`);
                const link = `http://localhost:3000/auth/validate/${validateToken}`;
                mailer_service_1.MailerService.send(mail({ url: link }), email).then(() => console.log('Correo enviado a', email));
                return user;
            }
            catch (error) {
                console.log({ error });
                return null;
            }
        });
    }
    static login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield users_service_1.UsersService.getOneByEmail(email);
                if (!data) {
                    throw data;
                }
                const isValid = yield (0, bcrypt_1.compare)(password, data.password);
                if (!isValid) {
                    throw isValid;
                }
                if (!data.validated) {
                    throw new unauthorized_exception_1.UnauthorizedException('Debes validar tu correo electrónico para continuar');
                }
                const { id, balance, groups } = data;
                const permissions = groups.flatMap((group) => group.permissions.map((permission) => permission.name));
                const token = jwt_service_1.JWTService.generate({
                    id,
                    email,
                    permissions,
                });
                return {
                    success: true,
                    token,
                    data: {
                        email,
                        balance,
                        permissions,
                    },
                };
            }
            catch (error) {
                console.log(Object.assign({}, error));
                return { error };
            }
        });
    }
    static validateEmail(token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = jwt_service_1.JWTService.verify(token);
                const { data } = yield users_service_1.UsersService.getOneById(payload.id);
                if (!data) {
                    return {
                        message: 'El token que estás usando es inválido',
                    };
                }
                if (data.validated) {
                    const mail = handlebars_1.default.compile(`<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta http-equiv="X-UA-Compatible" content="IE=edge">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Document</title>
				</head>
				<body>
				Ya está validado el correo electrónico, {{name}}. BASTA!!!
				</body>
				</html>`);
                    return mail({
                        name: (_a = data.profile) === null || _a === void 0 ? void 0 : _a.firstname,
                    });
                }
                yield users_service_1.UsersService.updateUser(payload.id, {
                    validated: true,
                });
                const mail = handlebars_1.default.compile(`<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Document</title>
			</head>
			<body>
			Genial, validaste tu correo. Nos vemos pronto {{name}}
			</body>
			</html>`);
                return mail({
                    name: (_b = data.profile) === null || _b === void 0 ? void 0 : _b.firstname,
                });
            }
            catch (error) {
                const mail = handlebars_1.default.compile(`<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Document</title>
			</head>
			<body>
			Hubo un error para validar tu correo, volve a intentarlo
			</body>
			</html>`);
                return mail({});
            }
        });
    }
}
exports.AuthService = AuthService;
