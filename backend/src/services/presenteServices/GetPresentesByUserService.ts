import { NotFound } from "../../errors/NotFound";
import { PresenteRepository } from "../../repositories/PresenteRepository";

export class GetPresentesByUserService {
    constructor(private presenteRepository: PresenteRepository) {}

    async execute(userId: string) {
        const presentes = await this.presenteRepository.getPresentesByUser(userId)

        if (!presentes || presentes?.length === 0) {
            throw new NotFound("Não há presentes cadastrados por esse usuário")
        }

        return presentes
    }

}