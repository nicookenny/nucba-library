import { Router } from "express";
import { EditorialController } from "../controllers/Editorial.controller";




const router = Router()

router.post('/', EditorialController.create)

router.get('/', EditorialController.getAll)

router.get('/:ID', EditorialController.getID)

router.patch('/:ID', EditorialController.update)

router.delete('/:ID', EditorialController.delete)

export default router