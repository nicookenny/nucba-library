import { prisma } from '..';

export class EditorialService {
    constructor() { }

    public static async create({ name, phone, email }: any) {
        const created = await prisma.editorial.create({
            data: {
                email,
                name,
                phone,
            },
        });

        return created;
    }

    public static async getAll() {
        try {
            const data = await prisma.editorial.findMany();
            return { success: true, data };
        } catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }

    public static async getOneById(id: any) {
        try {
            const data = await prisma.editorial.findUnique({ where: { id } });
            return { success: true, data };
        } catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }

    public static async update(id: any, data: any) {
        try {
            const editorial = this.getOneById(id)
            if (!editorial) {
                throw Error()
            }
            const modified = await prisma.editorial.update({
                where: { id },
                data: { ...data },
            })
            return { success: true, modified }
        }
        catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }

    public static async delete(id: any) {
        try {
            const deleteUser = await prisma.editorial.delete({ where: { id }})
            return { success: true, deleteUser };
        } catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }
}
