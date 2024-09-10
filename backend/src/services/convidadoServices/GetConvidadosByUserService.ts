import { NotFound } from "../../errors/NotFound";
import { ConvidadoRepository } from "../../repositories/ConvidadoRepository";
import { UserRepository } from "../../repositories/UserRepository";

export class GetConvidadosByUserService {
    constructor(
        private convidadosRepository: ConvidadoRepository,
        private userRepository: UserRepository
    ) {}

    async execute(id: string) {
        const userExists = await this.userRepository.getUserById(id)
        if (!userExists) {
            throw new NotFound("Usuário não encontrado!")
        }

        const convidados = await this.convidadosRepository.getConvidadosByUser(userExists.id)
        return convidados
    }

}