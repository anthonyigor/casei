import { Presente } from "@prisma/client";
import { PresenteRepository } from "../../repositories/PresenteRepository";

export class GetPresentesConvidadoService {
    constructor(private readonly presenteRepository: PresenteRepository) {}

    async execute(convidadoId: string): Promise<Presente[]> {
        const presentes = await this.presenteRepository.getPresentesByConvidado(convidadoId)
        return presentes;
    }

}