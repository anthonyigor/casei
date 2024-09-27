import { InternalError } from "../../errors/InternalError";
import { PresenteRepository } from "../../repositories/PresenteRepository";

export class UnsetPresenteConvidado {
    constructor (private readonly presenteRepository: PresenteRepository) {}

    async execute(presenteId: string): Promise<void> {
        try {
            await this.presenteRepository.unsetPresenteConvidado(presenteId); 
        } catch (error) {
            throw new InternalError('Erro ao desvincular presente do convidado')
        }
    }

}