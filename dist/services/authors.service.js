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
exports.AuthorService = void 0;
const __1 = require("..");
class AuthorService {
    constructor() { }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const author = yield __1.prisma.author.create({ data: Object.assign({}, data) });
                return { success: true, author };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static getAllAuthors() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authors = yield __1.prisma.author.findMany({
                    include: {
                        books: true,
                    },
                });
                return { success: true, authors };
            }
            catch (error) {
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static getAuthorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const author = yield __1.prisma.author.findUnique({ where: { id } });
                return { success: true, author };
            }
            catch (error) {
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static updateAuthorById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modified = yield __1.prisma.author.update({
                    where: { id },
                    data: Object.assign({}, data),
                });
                return { success: true, modified };
            }
            catch (error) {
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static deleteAuthorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield __1.prisma.author.delete({ where: { id } });
                return { success: true, deleted };
            }
            catch (error) {
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
}
exports.AuthorService = AuthorService;
