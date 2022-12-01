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
exports.LoansController = void 0;
const loans_service_1 = require("../services/loans.service");
class LoansController {
    constructor() { }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bookId, userId, date } = req.body;
            const createLoan = yield loans_service_1.LoansService.create({
                userId,
                bookId,
                date
            });
            res.status(createLoan.sucess ? 200 : 400).send(createLoan);
        });
    }
}
exports.LoansController = LoansController;
