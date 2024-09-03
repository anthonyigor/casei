import { User } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class UserRepository {
    async create(user: User): Promise<User | Error> {
        try {
            const newUser = await prisma.user.create({
                data: user
            })

            return newUser
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao criar usuário")
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }   
}