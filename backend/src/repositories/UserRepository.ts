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
                email: email
            }
        })

        return user
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user
    }

    async update(id: string, user: User): Promise<User | Error> {

        try {
            const updatedUser = await prisma.user.update({
                where: {
                    id: id
                },
                data: user
            })
    
            return updatedUser
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao atualizar usuário")
        }
    }

    async updateConviteUrl(id: string, url: string): Promise<User> {
        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                convite_url: url
            }
        })

        return updatedUser
    }

    async updatePassword(id: string, password: string): Promise<void> {
        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                password: password
            }
        })
    }

}