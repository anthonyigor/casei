import { Convidado } from "@prisma/client";
import { ConvidadoRepository } from "../../repositories/ConvidadoRepository";
import { UserRepository } from "../../repositories/UserRepository";

export class CreateConvidadoService {
    constructor(
        private convidadoRepository: ConvidadoRepository,
        private userRepository: UserRepository
    ) {}

    async execute(convidado: Convidado) {
        const convidadoExists = await this.convidadoRepository.getConvidadoByTelefone(convidado.telefone)
        if (convidadoExists) {
            throw new Error("Convidado já cadastrado!")
        }

        const userExists = await this.userRepository.getUserById(convidado.user_id!)
        if (!userExists) {
            throw new Error("Usuário não encontrado!")
        }

        try {
            const newConvidado = await this.convidadoRepository.create(convidado)
            return newConvidado
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao criar convidado!")
        }

    }

}