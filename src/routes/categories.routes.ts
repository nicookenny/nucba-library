import { Router } from 'express';
import { CategoryController } from './../controllers/categories.controller';

const router = Router();

router.post('/', CategoryController.create);
router.get('/', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getCategoryById);
router.put('/:id', CategoryController.updateCategoryById);
router.delete('/:id', CategoryController.deleteCategoryById);

export default router;
