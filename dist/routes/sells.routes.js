"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sells_controller_1 = require("../controllers/sells.controller");
const router = (0, express_1.Router)();
router.post('/', sells_controller_1.SellController.create);
exports.default = router;
