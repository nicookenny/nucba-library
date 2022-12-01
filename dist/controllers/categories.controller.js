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
exports.CategoryController = void 0;
const categories_service_1 = require("../services/categories.service");
class CategoryController {
    constructor() { }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield categories_service_1.CategoryService.create(req.body);
            res.status(created.success ? 201 : 400).send(created);
        });
    }
    static getAllCategory(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categorys = yield categories_service_1.CategoryService.getAllCategory();
            res.status(categorys.success ? 200 : 404).send(categorys);
        });
    }
    static getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield categories_service_1.CategoryService.getCategoryById(req.params.id);
            res.status(category.success ? 200 : 404).send(category);
        });
    }
    static updateCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCategory = yield categories_service_1.CategoryService.updateCategoryById(req.params.id, req.body);
            res.status(updatedCategory.success ? 200 : 404).send(updatedCategory);
        });
    }
    static deleteCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCategory = yield categories_service_1.CategoryService.deleteCategoryById(req.params.id);
            res.status(deletedCategory.success ? 200 : 404).send(deletedCategory);
        });
    }
}
exports.CategoryController = CategoryController;
