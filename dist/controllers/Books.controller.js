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
exports.BooksController = void 0;
const Books_service_1 = require("../services/Books.service");
class BooksController {
    constructor() { }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, synopsis, type, sellPrice, loanPrice, author, categories, editorials } = req.body;
            const { user } = req;
            const created = yield Books_service_1.BooksService.create({
                title,
                synopsis,
                type,
                sellPrice,
                loanPrice,
                author,
                categories,
                editorials,
                user: user.id,
            });
            res.status(created.success ? 201 : 400).send(created);
        });
    }
    static getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield Books_service_1.BooksService.getAllBooks();
            res.status(books.success ? 200 : 404).send(books);
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield Books_service_1.BooksService.getBookById(req.params.id);
            res.status(book.success ? 200 : 404).send(book);
        });
    }
    static updateOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedBook = yield Books_service_1.BooksService.updateBookById(req.params.id, req.body);
            res.status(updatedBook.success ? 200 : 404).send(updatedBook);
        });
    }
    static deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBook = yield Books_service_1.BooksService.deleteBookById(req.params.id);
            res.status(deletedBook.success ? 200 : 404).send(deletedBook);
        });
    }
}
exports.BooksController = BooksController;
