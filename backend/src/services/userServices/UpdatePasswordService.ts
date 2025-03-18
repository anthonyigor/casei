import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/UserRepository";
import { InternalError } from "../../errors/InternalError";
import { NotFound } from "../../errors/NotFound";
import bcrypt from "bcryptjs";
import { BadRequest } from "../../errors/BadRequest";

export class UpdatePasswordService {
    constructor(private userRepository: UserRepository) {}
    
    async execute(id: string, password: string, newPassword: string) {
        try {
            const user = await this.userRepository.getUserById(id)
            
            if (!user) {
                throw new NotFound("Usuário não encontrado")
            }

            const checkOldPassword = await bcrypt.compare(password, user.password)
            if (!checkOldPassword) {
                throw new BadRequest("Senha incorreta")
            }

            const newPasswordHash = await bcrypt.hash(newPassword, 10)
            
            await this.userRepository.updatePassword(id, newPasswordHash)
        } catch (error) {
            throw new InternalError("Erro ao atualizar usuário")
        }

    }

}