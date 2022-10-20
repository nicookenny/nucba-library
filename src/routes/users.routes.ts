import { Router } from 'express';
import { UsersController } from '../controllers';

const router = Router();

router.post('/', UsersController.create);

router.get('/', UsersController.get);
router.get('/:ID', UsersController.getID);

router.patch('/:ID');

router.delete('/:ID');

export default router;


// router.get('/') y router.get('/:ID');
