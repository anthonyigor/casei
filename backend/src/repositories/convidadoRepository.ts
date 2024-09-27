import { Convidado } from "@prisma/client";
import { prisma } from '../lib/prisma';
import { InternalError } from "../errors/InternalError";

export class ConvidadoRepository {
    async create(convidado: Convidado): Promise<Convidado | Error> {
        try {
            const newConvidado = await prisma.convidado.create({
                data: convidado,
            })

            return newConvidado;
        } catch (error) {
            console.log(error)
            throw new InternalError("Erro ao criar convidado!")
        }
    }

    async getConvidadoByTelefone(telefone: string): Promise<Convidado | null> {
        const convidado = await prisma.convidado.findUnique({
            where: {
                telefone: telefone
            }
        })

        return convidado
    }

    async getConvidadosByUser(user_id: string): Promise<Convidado[]> {
        const convidados = await prisma.convidado.findMany({
            where: {
                user_id: user_id
            }
        })

        return convidados
    }
    
    async getConvidado(user_id: string, convidado_id: string): Promise<Convidado | null> {
        const convidado = await prisma.convidado.findUnique({
            where: {
                id: convidado_id,
                user_id: user_id
            },
            include: {
                presentes: true
            }
        })

        return convidado
    }

    async updateConvidado(convidado: Convidado): Promise<void> {
        try {
            await prisma.convidado.update({
                where: {
                    id: convidado.id
                },
                data: convidado
            })
        } catch (error) {
            console.log(error)
            throw new InternalError("Erro ao editar convidado!")
        }
    }

}