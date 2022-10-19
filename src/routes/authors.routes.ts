import { Router } from 'express';
import { AuthorsController } from '../controllers';

const router = Router();

router.post('/', AuthorsController.create);
router.get('/', AuthorsController.getAllAuthors);
router.get('/:id', AuthorsController.getAuthorById);
router.put('/:id', AuthorsController.updateAuthorById);
router.delete('/:id', AuthorsController.deleteAuthorById);

export default router;
