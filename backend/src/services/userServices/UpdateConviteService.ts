import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/UserRepository";
import bcrypt from "bcrypt";
import { NotFound } from "../../errors/NotFound";
import { BadRequest } from "../../errors/BadRequest";

export class UpdateConviteService {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string, fileUrl: string): Promise<User> {
        const user = await this.userRepository.getUserById(id)

        if (!user) {
            throw new NotFound("Usuário não encontrado")
        }

        try {
            const userUpdated = await this.userRepository.updateConviteUrl(id, fileUrl)
            return userUpdated;
        } catch (error) {
            throw new BadRequest("Erro ao atualizar convite")
        }
        
    }
}