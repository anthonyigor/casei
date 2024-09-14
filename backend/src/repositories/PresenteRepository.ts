import { Presente } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class PresenteRepository {
    async createPresente(presente: Presente): Promise<Presente | Error> {
        try {
            const newPresente = await prisma.presente.create({
                data: presente
            })

            return newPresente
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao criar presente")
        }
    }

    async getPresentesByUser(userId: string): Promise<Presente[] | null> {
        const presentes = await prisma.presente.findMany({
            where: {
                user_id: userId
            },
            include: {
                convidado: true
            }
        })

        return presentes
    }

    async getPresentesDisponiveisByUser(userId: string): Promise<Presente[] | null> {
        const presentes = await prisma.presente.findMany({
            where: {
                user_id: userId,
                selecionado: false
            }
        })

        return presentes
    }
}