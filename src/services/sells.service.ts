import { prisma } from ".."
import { UsersService } from "./users.service"


export class SellsService{
    constructor(){}

    static async getPrice(id: number){
        try {
            const data= await prisma.book.findUnique({where: {id}})
            return {price: data?.sellPrice}
        } catch (error) {
            console.log({error})
            return {sucess: false, error: 'Hubo un error'}
        }
    }

    public static async create (sell:any){
        try {
            const {bookId, userId} = sell
            const {price} = await this.getPrice(bookId)
            const user = await UsersService.getOneById(userId)
            const selled = await prisma.sell.create({
                data:{
                    bookId,
                    userId,
                    amount: price!,
                }
            })
            const balance = user.data?.balance! - selled.amount

            await UsersService.updateUser(userId, {balance})

            return {sucess: true, sell: selled}
        } catch (error) {
            return{sucess: false, error: 'Hubo un error'}
        }
    }
}