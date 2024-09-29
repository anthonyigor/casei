import { NotFound } from "../../errors/NotFound";
import { PresenteRepository } from "../../repositories/PresenteRepository";

export class GetPresenteService {
    constructor(private readonly presenteRepository: PresenteRepository) {}

    async execute(presenteId: string, userId: string) {
        const presente = await this.presenteRepository.getPresenteById(presenteId, userId);
        
        if (!presente) throw new NotFound('Presente não encontrado');
        
        return presente;
    }

}