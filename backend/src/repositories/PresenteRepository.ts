import { Presente } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { InternalError } from "../errors/InternalError";

export class PresenteRepository {
    async createPresente(presente: Presente): Promise<Presente | Error> {
        try {
            const newPresente = await prisma.presente.create({
                data: presente
            })

            return newPresente
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getPresenteById(presenteId: string, userId: string): Promise<Presente | null> {
        const presente = await prisma.presente.findUnique({
            where: {
                id: presenteId,
                user_id: userId
            }
        });

        return presente;
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

    async getPresentesByConvidado(convidadoId: string): Promise<Presente[]> {
        const presentes = await prisma.presente.findMany({
            where: {
                convidado_id: convidadoId
            }
        })

        return presentes;
    }

    async getPresentesDisponiveisByUser(userId: string): Promise<Presente[] | null> {
        const presentes = await prisma.presente.findMany({
            where: {
                user_id: userId,
                selecionado: false
            },
            include: {
                user: true
            }
        })

        return presentes
    }

    async setPresenteConvidado(presenteId: string, convidadoId: string, tipo_selecao: string): Promise<void> {
        try {
            await prisma.presente.update({
                where: {
                    id: presenteId
                },
                data: {
                    convidado_id: convidadoId,
                    selecionado: true,
                    tipo_selecao
                }
            })
        } catch (error) {
            console.log(error)
            throw new InternalError('Erro ao atualizar presente')
        }
    }

    async unsetPresenteConvidado(presenteId: string): Promise<void> {
        try {
            await prisma.presente.update({
                where: {
                    id: presenteId
                },
                data: {
                    convidado_id: null,
                    selecionado: false
                }
            })
        } catch (error) {
            console.log(error)
            throw new InternalError('Erro ao atualizar presente')
        }
    }

    async updatePresente(presente: Presente): Promise<void> {
        try {
            await prisma.presente.update({
                where: {
                    id: presente.id
                },
                data: presente
            })
        } catch (error) {
            console.log(error)
            throw new InternalError('Erro ao atualizar presente')
        }
    }

    async deletePresente(presenteId: string, userId: string): Promise<void> {
        try {
            await prisma.presente.delete({
                where: {
                    id: presenteId,
                    user_id: userId
                }
            })
        } catch (error) {
            console.log(error)
            throw new InternalError('Erro ao deletar presente')
        }
    }

}