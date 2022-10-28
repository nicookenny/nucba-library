import { Router } from 'express';
import { BooksController } from '../controllers';

const router = Router();

router.post('/', BooksController.create);
router.get('/', BooksController.getAll);
router.get('/:id', BooksController.getById);
router.put('/:id', BooksController.updateOne);
router.delete('/:id', BooksController.deleteOne);

export default router;
