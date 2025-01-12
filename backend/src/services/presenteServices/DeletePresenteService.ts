import { Presente } from "@prisma/client";
import { PresenteRepository } from "../../repositories/PresenteRepository";
import { InternalError } from "../../errors/InternalError";

export class DeletePresenteService {
    constructor(private presenteRepository: PresenteRepository) {}

    async execute(presente: Presente, userId: string): Promise<void | InternalError> {
        try {
            await this.presenteRepository.deletePresente(presente.id, userId)
        } catch (error) {
            throw new InternalError('Erro ao deletar presente')
        }
    }

}