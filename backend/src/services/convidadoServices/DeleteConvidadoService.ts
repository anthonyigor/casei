import { ConvidadoRepository } from "../../repositories/ConvidadoRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { NotFound } from "../../errors/NotFound";

export class DeleteConvidadoService {
    constructor(
        private convidadoRepository: ConvidadoRepository,
        private userRepository: UserRepository
    ) {}

    async execute(user_id: string, convidado_id: string) {
        const userExists = await this.userRepository.getUserById(user_id)
        if (!userExists) {
            throw new NotFound("Usuário não encontrado!")
        }

        const convidado = await this.convidadoRepository.getConvidado(user_id, convidado_id)
        if (!convidado) {
            throw new NotFound("Convidado não encontrado!")
        }

        await this.convidadoRepository.deleteConvidado(user_id, convidado_id)

    }

}