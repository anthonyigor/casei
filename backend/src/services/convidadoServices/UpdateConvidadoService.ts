import { Convidado } from "@prisma/client";
import { ConvidadoRepository } from "../../repositories/ConvidadoRepository";
import { InternalError } from "../../errors/InternalError";

export class UpdateConvidadoService {
    constructor(private readonly convidadoRepository: ConvidadoRepository) {}

    async execute(convidado: Convidado): Promise<void> {
        try {
            await this.convidadoRepository.updateConvidado(convidado);
        } catch (error) {
            throw new InternalError('Erro ao atualizar convidado')
        }
    }

}