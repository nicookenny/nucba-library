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
exports.UsersController = void 0;
const users_service_1 = require("../services/users.service");
class UsersController {
    constructor() { }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, profile } = req.body;
            const { firstname, lastname, dni, phone, address } = profile;
            const { street, number, zipCode, floor, apartment, city } = address;
            const created = yield users_service_1.UsersService.create({
                email,
                profile: {
                    firstname,
                    lastname,
                    dni,
                    phone,
                    address: {
                        street,
                        number,
                        zipCode,
                        floor,
                        apartment,
                        city,
                    },
                },
            });
            res.status(created.success ? 200 : 400).send(created);
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getData = yield users_service_1.UsersService.getAll();
                res.status(getData.success ? 200 : 400).send(getData);
            }
            catch (error) {
                res.status(error.status).json({ error: error.message });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ID } = req.params;
            const getData = yield users_service_1.UsersService.getOneById(ID);
            res.status(getData.success ? 200 : 400).send(getData);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ID } = req.params;
            const update = yield users_service_1.UsersService.updateUser(ID, req.body);
            res.status(update.success ? 200 : 400).send(update);
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ID } = req.params;
            const deleteUser = yield users_service_1.UsersService.deleteUser(ID);
            res.status(deleteUser.success ? 200 : 400).send(deleteUser);
        });
    }
    static addBalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ID } = req.params;
            const { balance } = req.body;
            const addBalance = yield users_service_1.UsersService.addBalance(ID, balance);
            res.status((addBalance === null || addBalance === void 0 ? void 0 : addBalance.success) ? 200 : 400).send(addBalance);
        });
    }
}
exports.UsersController = UsersController;
