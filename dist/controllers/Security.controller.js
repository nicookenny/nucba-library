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
exports.SecurityController = void 0;
const security_service_1 = require("../services/security.service");
class SecurityController {
    constructor() { }
    static createPermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const created = yield security_service_1.SecurityService.createPermission(name);
                return res.status(201).json(created);
            }
            catch (error) {
                return res.status(500).json({ sucess: false, error: 'Hubo un error' });
            }
        });
    }
    static getPermissions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const permissions = yield security_service_1.SecurityService.getPermissions();
                return res.status(200).json(permissions);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    static getGroups(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield security_service_1.SecurityService.getGroups();
                return res.status(200).json(groups);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    static createGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const created = yield security_service_1.SecurityService.createSecurityGroup(name);
                return res.status(201).json(created);
            }
            catch (error) {
                return res.status(500).json({ sucess: false, error: 'Hubo un error' });
            }
        });
    }
    static assignPermissionsToGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { permissions } = req.body;
                const { id } = req.params;
                const assigned = yield security_service_1.SecurityService.asignPermissionsToGroup(id, permissions);
                return res.status(201).json(assigned);
            }
            catch (error) {
                return res.status(500).json({ sucess: false, error: 'Hubo un error' });
            }
        });
    }
    static assignGroupsToUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { groups } = req.body;
                const { id } = req.params;
                const assigned = yield security_service_1.SecurityService.assignGroupsToUser(id, groups);
                return res.status(201).json(assigned);
            }
            catch (error) {
                return res.status(500).json({ sucess: false, error: 'Hubo un error' });
            }
        });
    }
}
exports.SecurityController = SecurityController;
