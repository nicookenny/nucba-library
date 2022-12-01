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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const __1 = require("..");
class CategoryService {
    constructor() { }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bookID } = data, restData = __rest(data, ["bookID"]);
                const categoryBook = !!bookID
                    ? {
                        create: [
                            {
                                book: {
                                    connect: {
                                        id: bookID,
                                    },
                                },
                            },
                        ],
                    }
                    : {};
                const categories = yield __1.prisma.category.create({
                    data: Object.assign(Object.assign({}, restData), { books: categoryBook }),
                });
                return { success: true, categories };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static getAllCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield __1.prisma.category.findMany({
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        books: true,
                    },
                });
                return { success: true, categories };
            }
            catch (error) {
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield __1.prisma.category.findUnique({
                    where: { id },
                    include: {
                        books: {},
                    },
                });
                return { success: true, category };
            }
            catch (error) {
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static updateCategoryById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modified = yield __1.prisma.category.update({
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
    static deleteCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield __1.prisma.category.delete({ where: { id } });
                return { success: true, deleted };
            }
            catch (error) {
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
}
exports.CategoryService = CategoryService;
