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
exports.SecurityService = void 0;
const __1 = require("..");
class SecurityService {
    constructor() { }
    static createSecurityGroup(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const created = yield __1.prisma.permissionGroup.create({
                    data: {
                        name,
                    },
                });
                return { success: true, permission: created };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static createPermission(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const created = yield __1.prisma.permission.create({
                    data: {
                        name,
                    },
                });
                return { success: true, permission: created };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static getPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const permissions = yield __1.prisma.permission.findMany();
                return { success: true, permissions };
            }
            catch (error) {
                console.error(error);
                return { success: false, error: 'Hubo un error' };
            }
        });
    }
    static getGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield __1.prisma.permissionGroup.findMany({
                    include: {
                        permissions: {
                            select: {
                                name: true,
                            },
                        },
                    },
                });
                return { success: true, groups };
            }
            catch (error) {
                console.error(error);
                return { success: false, error: 'Hubo un error' };
            }
        });
    }
    static asignPermissionsToGroup(group, permissions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield __1.prisma.permissionGroup.update({
                    where: {
                        id: group,
                    },
                    data: {
                        permissions: {
                            connect: permissions.map((permission) => ({ name: permission })),
                        },
                    },
                });
                return {
                    success: true,
                    updated,
                };
            }
            catch (error) {
                console.error(error);
                return { success: false, error: 'Hubo un error' };
            }
        });
    }
    static assignGroupsToUser(user, groups) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield __1.prisma.user.update({
                    where: {
                        id: user,
                    },
                    data: {
                        groups: {
                            connect: groups.map((group) => ({ id: group })),
                        },
                    },
                });
                return {
                    success: true,
                    updated,
                };
            }
            catch (error) {
                console.error(error);
                return { success: false, error: 'Hubo un error' };
            }
        });
    }
}
exports.SecurityService = SecurityService;
