import { Convidado } from "@prisma/client";
import { prisma } from '../lib/prisma';

export class ConvidadoRepository {
    async create(convidado: Convidado): Promise<Convidado | Error> {
        try {
            const newConvidado = await prisma.convidado.create({
                data: convidado
            })

            return newConvidado;
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao criar convidado!")
        }
    }
}