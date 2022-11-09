import { Router } from "express";
import { LoansController } from "../controllers/loans.controller";



const router = Router()

router.post('/', LoansController.create)

export default router