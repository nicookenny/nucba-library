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
exports.LoansService = void 0;
const __1 = require("..");
const users_service_1 = require("./users.service");
class LoansService {
    constructor() { }
    static getCost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield __1.prisma.book.findUnique({ where: { id } });
                return { price: data === null || data === void 0 ? void 0 : data.loanPrice };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static create(loan) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, bookId } = loan;
                const { price } = yield this.getCost(bookId);
                const user = yield users_service_1.UsersService.getOneById(userId);
                const loaned = yield __1.prisma.loan.create({
                    data: {
                        userId,
                        bookId,
                        cost: price,
                    }
                });
                const balance = ((_a = user.data) === null || _a === void 0 ? void 0 : _a.balance) - loaned.cost;
                yield users_service_1.UsersService.updateUser(userId, { balance });
                return { sucess: true, loan: loaned };
            }
            catch (error) {
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
}
exports.LoansService = LoansService;
