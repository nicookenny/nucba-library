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
exports.MailerService = void 0;
const nodemailer_1 = require("nodemailer");
class MailerService {
    constructor() { }
    static send(message, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transporter = (0, nodemailer_1.createTransport)({
                    service: 'gmail',
                    auth: {
                        user: 'nucbalib1817@gmail.com',
                        pass: 'pprusxyraoremvqs',
                    },
                });
                const mail = yield transporter.sendMail({
                    to,
                    subject: 'TEST',
                    html: message,
                });
                return mail;
            }
            catch (error) {
                console.log({ error });
            }
        });
    }
}
exports.MailerService = MailerService;
