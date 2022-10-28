import { Router } from 'express';
import { EditorialController } from '../controllers/Editorial.controller';

const router = Router();

router.post('/', EditorialController.create);
router.get('/', EditorialController.getAll);
router.get('/:id');
router.put('/:id');
router.delete('/:id');

export default router;
