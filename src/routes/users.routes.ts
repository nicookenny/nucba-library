import { Router } from 'express';
import { UsersController } from '../controllers';

const router = Router();

router.post('/', UsersController.create);

router.get('/', UsersController.get);
router.get('/:ID', UsersController.getID);

router.patch('/:ID', UsersController.update);

router.delete('/:ID', UsersController.deleteUser);

router.patch('/:ID/balance', UsersController.addBalance);

export default router;


// router.get('/') y router.get('/:ID');
