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
exports.authenticate = void 0;
const unauthorized_exception_1 = require("../exceptions/unauthorized.exception");
const jwt_service_1 = require("../services/jwt.service");
const users_service_1 = require("../services/users.service");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new unauthorized_exception_1.UnauthorizedException('No enviaste token');
        }
        const { 1: token } = authorization.split(' ');
        if (!token) {
            throw new unauthorized_exception_1.UnauthorizedException();
        }
        const { id } = jwt_service_1.JWTService.verify(token);
        if (!id) {
            throw new unauthorized_exception_1.UnauthorizedException();
        }
        const { data } = yield users_service_1.UsersService.getOneById(id);
        req.user = data;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.authenticate = authenticate;
