import { PresenteRepository } from "../../repositories/PresenteRepository";

export class GetPresentesDisponiveisByUserService {
    constructor(private presenteRepository: PresenteRepository) {}

    async execute(userId: string) {
        const presentes = await this.presenteRepository.getPresentesDisponiveisByUser(userId)
        return presentes
    }
}