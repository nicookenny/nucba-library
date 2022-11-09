import { Request, Response } from "express";
import { LoansService } from "../services/loans.service";


export class LoansController{
    constructor(){}

    static async create(req: Request, res: Response){
        const {bookId, userId, date} = req.body

        const createLoan = await LoansService.create({
            userId,
            bookId,
            date
        })
        res.status(createLoan.sucess ? 200 : 400).send(createLoan)
    }
}