import { Router } from "express";
import { SellController } from "../controllers/sells.controller";



const router = Router()

router.post('/', SellController.create)

export default router