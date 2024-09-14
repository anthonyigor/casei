import { Presente } from "@prisma/client";
import { PresenteRepository } from "../../repositories/PresenteRepository";
import { InternalError } from "../../errors/InternalError";

export class CreatePresenteService {
    constructor(private presenteRepository: PresenteRepository) {}

    async execute(presente: Presente): Promise<Presente | InternalError> {
        const res = await this.presenteRepository.createPresente(presente)
        if (res instanceof Error) {
            throw new InternalError(res.message)
        }

        return res
    }

}