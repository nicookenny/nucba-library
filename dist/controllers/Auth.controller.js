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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    constructor() { }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, profile, password } = req.body;
            const created = yield auth_service_1.AuthService.register({
                email,
                password,
                profile,
            });
            res.status(200).send({
                success: true,
                created,
            });
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const { token, data, error } = yield auth_service_1.AuthService.login({ email, password });
            if (error) {
                return res.status(500).send({ error });
            }
            res.status(200).send({
                success: true,
                token,
                data,
            });
        });
    }
    static validateEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const html = yield auth_service_1.AuthService.validateEmail(token);
            res.send(html);
        });
    }
}
exports.AuthController = AuthController;
