import { Router } from 'express';
import { UsersController } from '../controllers';
import { authenticate } from '../middlewares/authentication';
import { havePermission } from '../middlewares/authorization';

const router = Router();

router.post('/', UsersController.create);

router.get('/', authenticate, havePermission(['USUARIOS/VER_LISTADO', 'PRESTAMOS/ANULAR']), UsersController.getAll);
router.get('/:ID', UsersController.getById);

router.patch('/:ID');

router.delete('/:ID');

export default router;

// router.get('/') y router.get('/:ID');
