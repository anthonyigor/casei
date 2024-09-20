import { NotFound } from "../../errors/NotFound";
import { ConvidadoRepository } from "../../repositories/ConvidadoRepository";

export class GetConvidadoService {
    constructor(private readonly convidadoRepository: ConvidadoRepository) { }

    async execute(userId: string, convidadoId: string) {
        const convidado = await this.convidadoRepository.getConvidado(userId, convidadoId)

        if (!convidado) throw new NotFound("Convidado não encontrado")

        return convidado
    }

}