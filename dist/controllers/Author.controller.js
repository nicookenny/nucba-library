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
exports.AuthorsController = void 0;
const authors_service_1 = require("../services/authors.service");
class AuthorsController {
    constructor() { }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield authors_service_1.AuthorService.create(req.body);
            res.status(created.success ? 201 : 400).send(created);
        });
    }
    static getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authors = yield authors_service_1.AuthorService.getAllAuthors();
            res.status(authors.success ? 200 : 404).send(authors);
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = yield authors_service_1.AuthorService.getAuthorById(req.params.id);
            res.status(author.success ? 200 : 404).send(author);
        });
    }
    static updateOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const modified = yield authors_service_1.AuthorService.updateAuthorById(req.params.id, req.body);
            res.status(modified.success ? 200 : 404).send(modified);
        });
    }
    static deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield authors_service_1.AuthorService.deleteAuthorById(+req.params.id);
            res.status(deleted.success ? 200 : 404).send(deleted);
        });
    }
}
exports.AuthorsController = AuthorsController;
