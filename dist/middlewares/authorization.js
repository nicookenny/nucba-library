"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.havePermission = void 0;
const havePermission = (permissions) => (req, res, next) => {
    try {
        const { user } = req;
        const userPermissions = user.groups.flatMap((group) => group.permissions.map((permission) => permission.name));
        const canContinue = permissions.every((permission) => {
            return userPermissions.includes(permission);
        });
        if (!canContinue) {
            throw 'error';
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.havePermission = havePermission;
