import { NotFound } from "../../errors/NotFound";
import { PresenteRepository } from "../../repositories/PresenteRepository";

export class GetPresentesByUserService {
    constructor(private presenteRepository: PresenteRepository) {}

    async execute(userId: string) {
        const presentes = await this.presenteRepository.getPresentesByUser(userId)
        return presentes
    }

}