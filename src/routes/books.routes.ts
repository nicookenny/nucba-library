import { Router } from 'express';
import { BooksController } from '../controllers';

const router = Router();

router.post('/', BooksController.create);
router.get('/', BooksController.getAllBooks);
router.get('/:id', BooksController.getBookById);
router.put('/:id', BooksController.updateBookById);
router.delete('/:id', BooksController.deleteBookById);

export default router;
