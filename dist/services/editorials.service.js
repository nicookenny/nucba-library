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
exports.EditorialService = void 0;
const __1 = require("..");
class EditorialService {
    constructor() { }
    static create({ name, phone, email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield __1.prisma.editorial.create({
                data: {
                    email,
                    name,
                    phone,
                },
            });
            return created;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield __1.prisma.editorial.findMany();
                return { success: true, data };
            }
            catch (error) {
                console.log({ error });
                return { success: false, error: 'Hubo un error' };
            }
        });
    }
    static getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield __1.prisma.editorial.findUnique({ where: { id } });
                return { success: true, data };
            }
            catch (error) {
                console.log({ error });
                return { success: false, error: 'Hubo un error' };
            }
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const editorial = this.getOneById(id);
                if (!editorial) {
                    throw Error();
                }
                const modified = yield __1.prisma.editorial.update({
                    where: { id },
                    data: Object.assign({}, data),
                });
                return { success: true, modified };
            }
            catch (error) {
                console.log({ error });
                return { success: false, error: 'Hubo un error' };
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteUser = yield __1.prisma.editorial.delete({ where: { id } });
                return { success: true, deleteUser };
            }
            catch (error) {
                console.log({ error });
                return { success: false, error: 'Hubo un error' };
            }
        });
    }
}
exports.EditorialService = EditorialService;
