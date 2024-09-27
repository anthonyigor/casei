import { BadRequest } from "../../errors/BadRequest";
import { InternalError } from "../../errors/InternalError";
import { NotFound } from "../../errors/NotFound";
import { PresenteRepository } from "../../repositories/PresenteRepository";

export class SetPresenteConvidado {
    constructor(private readonly presenteRepository: PresenteRepository) {}

    async execute(presente_id: string, convidado_id: string, user_id: string): Promise<void> {
        const presente = await this.presenteRepository.getPresenteById(presente_id, user_id)

        if (!presente) {
            throw new NotFound('Presente não encontrado')
        }

        if (presente.selecionado) {
            throw new BadRequest('Presente já selecionado por um convidado')
        }

        try {
            await this.presenteRepository.setPresenteConvidado(presente.id, convidado_id)
        } catch (error: any) {
            throw new InternalError(error.message)
        }

    }

}