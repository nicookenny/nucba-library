import { Router } from 'express';
import { BooksController } from '../controllers';
import { authenticate } from '../middlewares/authentication';
import { havePermission } from '../middlewares/authorization';

const router = Router();

router.post('/', authenticate, BooksController.create);
router.get('/', BooksController.getAll);
router.get('/:id', BooksController.getById);
router.put('/:id', BooksController.updateOne);
router.delete('/:id', BooksController.deleteOne);

export default router;
