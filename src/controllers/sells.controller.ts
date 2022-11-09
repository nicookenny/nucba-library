import { Request, Response } from "express";
import { SellsService } from "../services/sells.service";


export class SellController{
    constructor(){}

    static async create(req: Request, res: Response){
        const { bookId, userId, date } = req.body

        const createSell = await SellsService.create({
            bookId,
            userId,
            date
        })
        res.status(createSell.sucess ? 200 : 400).send(createSell)
    }

}