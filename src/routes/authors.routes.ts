import { Router } from 'express';
import { AuthorsController } from '../controllers';

const router = Router();

router.post('/', AuthorsController.create);
router.get('/', AuthorsController.getAll);
router.get('/:id', AuthorsController.getById);
router.put('/:id', AuthorsController.updateOne);
router.delete('/:id', AuthorsController.deleteOne);

export default router;
