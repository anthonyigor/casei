import { BadRequest } from "../../errors/BadRequest";
import { NotFound } from "../../errors/NotFound";
import { ConvidadoRepository } from "../../repositories/ConvidadoRepository";

export class GetConvidadoByNomeService{
    constructor(private readonly convidadoRepository: ConvidadoRepository) {}

    async execute(userId: string, nome: string){
        if (!nome) {
            throw new BadRequest("Nome não informado")
        }

        const convidado = await this.convidadoRepository.getConvidadoByNomeAndUser(userId, nome)

        return convidado
    }
}