import { Request, Response } from 'express';
import { CategoryService } from '../services/categories.service';

export class CategoryController {
	constructor() {}

	public static async create(req: Request, res: Response) {
		const created = await CategoryService.create(req.body);

		res.status(created.success ? 201 : 400).send(created);
	}
	public static async getAllCategory(_req: Request, res: Response) {
		const categorys = await CategoryService.getAllCategory();

		res.status(categorys.success ? 200 : 404).send(categorys);
	}
	public static async getCategoryById(req: Request, res: Response) {
		const category = await CategoryService.getCategoryById(req.params.id);

		res.status(category.success ? 200 : 404).send(category);
	}
	public static async updateCategoryById(req: Request, res: Response) {
		const updatedCategory = await CategoryService.updateCategoryById(req.params.id, req.body);

		res.status(updatedCategory.success ? 200 : 404).send(updatedCategory);
	}
	public static async deleteCategoryById(req: Request, res: Response) {
		const deletedCategory = await CategoryService.deleteCategoryById(req.params.id);

		res.status(deletedCategory.success ? 200 : 404).send(deletedCategory);
	}
}
