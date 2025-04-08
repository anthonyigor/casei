import { BadRequest } from "../../errors/BadRequest";
import { InternalError } from "../../errors/InternalError";
import { NotFound } from "../../errors/NotFound";
import { PresenteRepository } from "../../repositories/PresenteRepository";

export class SetMessageService {
    constructor(private readonly presenteRepository: PresenteRepository) {}

    async execute(presente_id: string, user_id: string, message: string): Promise<void> {
        const presente = await this.presenteRepository.getPresenteById(presente_id, user_id)

        if (!presente) {
            throw new NotFound('Presente não encontrado')
        }

        try {
            await this.presenteRepository.setMessage(presente.id, user_id, message)
        } catch (error: any) {
            throw new InternalError(error.message)
        }

    }

}