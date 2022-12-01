"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_controller_1 = require("../controllers/Auth.controller");
const router = (0, express_1.Router)();
router.post('/login', Auth_controller_1.AuthController.login);
router.post('/register', Auth_controller_1.AuthController.register);
router.get('/validate/:token', Auth_controller_1.AuthController.validateEmail);
exports.default = router;
