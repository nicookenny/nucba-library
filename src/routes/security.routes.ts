import { Router } from 'express';
import { SecurityController } from '../controllers/Security.controller';

const router = Router();

router.post('/permissions', SecurityController.createPermission);

router.get('/permissions', SecurityController.getPermissions);

router.post('/groups', SecurityController.createGroup);

router.get('/groups', SecurityController.getGroups);

router.patch('/groups/:id', SecurityController.assignPermissionsToGroup);

router.patch('/users/:id', SecurityController.assignGroupsToUser);
export default router;
