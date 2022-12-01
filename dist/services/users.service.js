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
exports.UsersService = void 0;
const __1 = require("..");
const roles_enum_1 = require("../entities/Users/roles.enum");
class UsersService {
    constructor() { }
    static create({ email, profile, password = '' }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstname, lastname, dni, phone, address } = profile;
                const { street, number, zipCode, floor, apartment, city } = address;
                const created = yield __1.prisma.user.create({
                    data: {
                        balance: 0,
                        role: roles_enum_1.UserRoles.CLIENT,
                        email,
                        password,
                        profile: {
                            create: {
                                firstname,
                                lastname,
                                dni,
                                phone,
                                address: {
                                    create: { street, number, zipCode, floor, apartment, city },
                                },
                            },
                        },
                    },
                    select: {
                        id: true,
                        email: true,
                        balance: true,
                        profile: {
                            select: {
                                firstname: true,
                                lastname: true,
                                dni: true,
                                phone: true,
                                address: {
                                    select: {
                                        street: true,
                                        number: true,
                                        city: true,
                                        zipCode: true,
                                        floor: true,
                                        apartment: true,
                                    },
                                },
                            },
                        },
                    },
                });
                return { success: true, user: created };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield __1.prisma.user.findMany();
                return { success: true, data };
            }
            catch (error) {
                console.log({ error1: error });
                return { success: false, error: 'Hubo un error' };
            }
        });
    }
    static getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield __1.prisma.user.findUnique({
                    where: { id },
                    include: {
                        purchases: true,
                        loans: true,
                        profile: true,
                        groups: {
                            include: {
                                permissions: true,
                            },
                        },
                    },
                });
                return { success: true, data };
            }
            catch (error) {
                console.log({ error });
                return { success: false, error: 'Hubo un error' };
            }
        });
    }
    static getOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield __1.prisma.user.findUnique({
                    where: { email },
                    include: {
                        purchases: true,
                        loans: true,
                        groups: {
                            include: {
                                permissions: true,
                            },
                        },
                    },
                });
                return { success: true, data };
            }
            catch (error) {
                console.log({ error });
                return { success: false, error: 'Hubo un error' };
            }
        });
    }
    static updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = this.getOneById(id);
                if (!user) {
                    throw Error();
                }
                const modified = yield __1.prisma.user.update({
                    where: { id },
                    data: Object.assign({}, data),
                });
                return { success: true, modified };
            }
            catch (error) {
                console.log({ error });
                return { success: false, error: 'Hubo un error' };
            }
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteUser = yield __1.prisma.user.delete({ where: { id }, include: { profile: true } });
                return { success: true, deleteUser };
            }
            catch (error) {
                console.log({ error });
                return { success: false, error: 'Hubo un error' };
            }
        });
    }
    static addBalance(id, balance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addBalance = yield this.updateUser(id, { balance });
                return addBalance;
            }
            catch (error) {
                console.log({ error });
            }
        });
    }
}
exports.UsersService = UsersService;
