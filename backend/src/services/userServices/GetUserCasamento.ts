import { NotFound } from "../../errors/NotFound";
import { UserRepository } from "../../repositories/UserRepository";

export class GetUserCasamento {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string): Promise<any> {
        const user = await this.userRepository.getUserById(id)

        if (!user) throw new NotFound("Usuário não encontrado")

        const userFiltered: any = {
            nome: user.nome, 
            nome_parceiro: user.nome_parceiro, 
            data_casamento: user.data_casamento, 
            lat: user.lat,
            lon: user.lon,
            endereco: user.endereco, 
            horario: user.horario,
            chave_pix: user.chave_pix,
            cidade: user.cidade,
            convite_url: user.convite_url,
            mensagem_agradecimento: user.mensagem_agradecimento
        }

        return userFiltered
    }

}