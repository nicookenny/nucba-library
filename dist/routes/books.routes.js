"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const authentication_1 = require("../middlewares/authentication");
const router = (0, express_1.Router)();
router.post('/', authentication_1.authenticate, controllers_1.BooksController.create);
router.get('/', controllers_1.BooksController.getAll);
router.get('/:id', controllers_1.BooksController.getById);
router.put('/:id', controllers_1.BooksController.updateOne);
router.delete('/:id', controllers_1.BooksController.deleteOne);
exports.default = router;