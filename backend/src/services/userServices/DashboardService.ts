import { UserRepository } from "../../repositories/UserRepository";
import "express-async-errors"; 
import { InternalError } from "../../errors/InternalError";
import { NotFound } from "../../errors/NotFound";
import { ConvidadoRepository } from "../../repositories/ConvidadoRepository";
import { diasParaData } from "../../utils/diasParaData";

export class DashboardService {
    constructor(
        private userRepository: UserRepository,
        private convidadoRepository: ConvidadoRepository
    ) {}

    async execute(id: string) {
        const user = await this.userRepository.getUserById(id)
        if (!user) {
            throw new NotFound('Usuário não existe')
        }

        const convidados = await this.convidadoRepository.getConvidadosByUser(id)

        return {
            data_casamento: user.data_casamento,
            dias_restantes: diasParaData(user.data_casamento!),
            total_convidados: convidados.length,
            total_confirmados: convidados.filter((convidado) => convidado.confirmado).length,
        }
    }
}