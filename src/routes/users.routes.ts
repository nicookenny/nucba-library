import { Router } from 'express';
import { UsersController } from '../controllers';

const router = Router();

router.post('/', UsersController.create);

router.get('/');
router.get('/:ID');

router.patch('/:ID');

router.delete('/:ID');

export default router;
