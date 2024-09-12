import { Presente } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class PresenteRepository {
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