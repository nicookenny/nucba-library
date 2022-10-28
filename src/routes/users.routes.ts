import { Router } from 'express';
import { UsersController } from '../controllers';

const router = Router();

router.post('/', UsersController.create);

router.get('/', UsersController.getAll);
router.get('/:ID', UsersController.getById);

router.patch('/:ID');

router.delete('/:ID');

export default router;

// router.get('/') y router.get('/:ID');
