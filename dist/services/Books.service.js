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
exports.BooksService = void 0;
const __1 = require("..");
class BooksService {
    constructor() { }
    static create({ title, synopsis, type, sellPrice, loanPrice, author, categories, editorials, user, }) {
        return __awaiter(this, void 0, void 0, function* () {
            [1, 2, 3];
            try {
                const created = yield __1.prisma.book.create({
                    include: {
                        createdBy: true,
                    },
                    data: {
                        title,
                        synopsis,
                        type,
                        sellPrice,
                        loanPrice,
                        author: {
                            connect: { id: author },
                        },
                        categories: {
                            connect: categories.map((category) => ({ id: category })),
                        },
                        createdBy: {
                            connect: {
                                id: user,
                            },
                        },
                        editorials: {
                            create: editorials.map(({ id, stock }) => ({
                                stock,
                                editorial: {
                                    connect: {
                                        id,
                                    },
                                },
                            })),
                        },
                    },
                });
                return { success: true, books: created };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield __1.prisma.book.findMany({
                    include: {
                        author: true,
                        editorials: {
                            select: {
                                stock: true,
                                editorial: true,
                            },
                        },
                        categories: true,
                    },
                });
                return { success: true, books: books };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield __1.prisma.book.findMany({
                    where: { id },
                    include: {
                        author: true,
                        categories: true,
                    },
                });
                return { success: true, book };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static updateBookById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedBook = yield __1.prisma.book.update({
                    where: { id },
                    data,
                });
                return { success: true, updatedBook };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static deleteBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedBook = yield __1.prisma.book.delete({ where: { id } });
                return { success: true, deletedBook };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
}
exports.BooksService = BooksService;
