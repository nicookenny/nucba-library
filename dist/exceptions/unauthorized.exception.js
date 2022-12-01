"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const HttpException_1 = require("./HttpException");
class UnauthorizedException extends HttpException_1.HttpException {
    constructor(message = 'Unauthorized') {
        super(401, '', message);
    }
}
exports.UnauthorizedException = UnauthorizedException;
