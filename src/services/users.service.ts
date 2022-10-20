import { prisma } from '..';
import { UserRoles } from '../entities/Users/roles.enum';
export class UsersService {
  constructor() {}

  public static async create({ email, profile }: any) {
    try {
      const { firstname, lastname, dni, phone, address } = profile;
      const { street, number, zipCode, floor, apartment, city } = address;

      const created = await prisma.user.create({
        data: {
          balance: 0,
          role: UserRoles.CLIENT,
          email,
          profile: {
            create: {
              firstname,
              lastname,
              dni,
              phone,
              address: {
                create: { street, number, zipCode, floor, apartment, city },
              },
            },
          },
        },
        select: {
          id: true,
          email: true,
          balance: true,
          profile: {
            select: {
              firstname: true,
              lastname: true,
              dni: true,
              phone: true,
              address: {
                select: {
                  street: true,
                  number: true,
                  city: true,
                  zipCode: true,
                  floor: true,
                  apartment: true,
                },
              },
            },
          },
        },
      });

      return { success: true, user: created };
    } catch (error) {
      console.log({ error });
      return { sucess: false, error: 'Hubo un error' };
    }
  }
  public static async get(){
    try {
      const data = await prisma.user.findMany()
      return {success: true, data}
    } catch (error) {
      return {success: false, error: 'Hubo un error'}
    }
  }
  public static async getID(id: any){
    try {
      const data = await prisma.user.findUnique({where:{id}
      })
      return {success: true, data}
    } catch (error) {
      return {success: false, error: 'Hubo un error'}
    }
  }
}
