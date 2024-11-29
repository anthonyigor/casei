import { ConvidadoRepository } from "../../repositories/ConvidadoRepository";

export class ConfirmarPresencaConvidadoService {
    constructor(private readonly convidadoRepository: ConvidadoRepository) {}

    async execute(userId: string, convidadoId: string) {
        await this.convidadoRepository.confirmarPresenca(userId, convidadoId)
    }
}