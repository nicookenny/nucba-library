import { prisma } from ".."
import { UsersService } from "./users.service"




export class LoansService{
    constructor(){}

    static async getCost(id: number){
        try {
            const data= await prisma.book.findUnique({where: {id}})
            return {price: data?.loanPrice}
        } catch (error) {
            console.log({error})
            return {sucess: false, error: 'Hubo un error'}
        }
    }

    static async create(loan:any){
        try {
            const {userId, bookId} = loan
            const {price} = await this.getCost(bookId)
            const user = await UsersService.getOneById(userId)
            
            const loaned = await prisma.loan.create({
                data:{
                    userId,
                    bookId,
                    cost: price!,
                }
            })

            const balance = user.data?.balance! - loaned.cost

            await UsersService.updateUser(userId, {balance})

            return {sucess: true, loan: loaned}

        } catch (error) {
            return{sucess: false, error: 'Hubo un error'}
        }
    }
}