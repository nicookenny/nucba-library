import { Router } from 'express';
import { PermissionController } from '../controllers/Permission.controller';

const router = Router();

router.post('/', PermissionController.create);
router.post('/user/:user', PermissionController.assignPermission);

export default router
