import { Convidado } from "@prisma/client";
import { ConvidadoRepository } from "../../repositories/ConvidadoRepository";
import { UserRepository } from "../../repositories/userRepository";
import { Conflict } from "../../errors/Conflict";
import { NotFound } from "../../errors/NotFound";
import { InternalError } from "../../errors/InternalError";

export class CreateConvidadoService {
    constructor(
        private convidadoRepository: ConvidadoRepository,
        private userRepository: UserRepository
    ) {}

    async execute(convidado: Convidado) {
        const convidadoExists = await this.convidadoRepository.getConvidadoByTelefone(convidado.telefone)
        if (convidadoExists) {
            throw new Conflict("Convidado já cadastrado!")
        }

        const userExists = await this.userRepository.getUserById(convidado.user_id!)
        if (!userExists) {
            throw new NotFound("Usuário não encontrado!")
        }

        try {
            const newConvidado = await this.convidadoRepository.create(convidado)
            return newConvidado
        } catch (error) {
            console.log(error)
            throw new InternalError("Erro ao criar convidado!")
        }

    }

}