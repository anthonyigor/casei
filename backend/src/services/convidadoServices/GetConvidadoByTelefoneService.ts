import { BadRequest } from "../../errors/BadRequest";
import { NotFound } from "../../errors/NotFound";
import { ConvidadoRepository } from "../../repositories/ConvidadoRepository";

export class GetConvidadoByTelefoneService{
    constructor(private readonly convidadoRepository: ConvidadoRepository) {}

    async execute(userId: string, telefone: string){
        if (!telefone) {
            throw new BadRequest("Telefone não informado")
        }

        const convidado = await this.convidadoRepository.getConvidadoByTelefoneAndUser(userId, telefone)

        if (!convidado) {
            throw new NotFound("Convidado não encontrado")
        }

        return convidado
    }
}