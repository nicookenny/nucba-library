import { Request, Response } from 'express';
import { EditorialService } from '../services/editorials.service';


export class EditorialController {
    constructor() { }

    public static async create(req: Request, res: Response) {
        const createdEditorial = await EditorialService.create(req.body);
        res.status(200).send({ success: true, editorial: createdEditorial });
    }

    public static async getAll(req: Request, res: Response) {
        const editorials = await EditorialService.getAll();

        res.status(200).send({ success: true, editorials });
    }

    public static async getID(req: Request, res: Response) {
        const { ID } = req.params;
        const getData = await EditorialService.getOneById(+ID);
        res.status(getData.success ? 200 : 400).send(getData);
    }

    public static async update(req: Request, res: Response) {
        const { ID } = req.params
        const update = await EditorialService.update(+ID, req.body)

        res.status(update.success ? 200 : 400).send(update)
    }

    public static async delete(req: Request, res: Response) {
        const { ID } = req.params
        const deleteUser = await EditorialService.delete(+ID)

        res.status(deleteUser.success ? 200 : 400).send(deleteUser)
    }
}
