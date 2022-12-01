"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loans_controller_1 = require("../controllers/loans.controller");
const router = (0, express_1.Router)();
router.post('/', loans_controller_1.LoansController.create);
exports.default = router;
