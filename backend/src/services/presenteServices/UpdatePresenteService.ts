import { Presente } from "@prisma/client";
import { PresenteRepository } from "../../repositories/PresenteRepository";
import { InternalError } from "../../errors/InternalError";

export class UpdatePresenteService {
    constructor(private readonly presenteRepository: PresenteRepository) {}

    async execute(presente: Presente): Promise<void> {
        try {
            await this.presenteRepository.updatePresente(presente);
        } catch (error: any) {
            throw new InternalError(error.message)
        }
    }

}