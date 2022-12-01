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
exports.EditorialController = void 0;
const editorials_service_1 = require("../services/editorials.service");
class EditorialController {
    constructor() { }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdEditorial = yield editorials_service_1.EditorialService.create(req.body);
            res.status(200).send({ success: true, editorial: createdEditorial });
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const editorials = yield editorials_service_1.EditorialService.getAll();
            res.status(200).send({ success: true, editorials });
        });
    }
    static getID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ID } = req.params;
            const getData = yield editorials_service_1.EditorialService.getOneById(+ID);
            res.status(getData.success ? 200 : 400).send(getData);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ID } = req.params;
            const update = yield editorials_service_1.EditorialService.update(+ID, req.body);
            res.status(update.success ? 200 : 400).send(update);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ID } = req.params;
            const deleteUser = yield editorials_service_1.EditorialService.delete(+ID);
            res.status(deleteUser.success ? 200 : 400).send(deleteUser);
        });
    }
}
exports.EditorialController = EditorialController;
