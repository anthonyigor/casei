import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/UserRepository";
import { InternalError } from "../../errors/InternalError";

export class UpdateUserService {
    constructor(private userRepository: UserRepository) {}
    
    async execute(id: string, user: User) {
        try {
            const updatedUser = await this.userRepository.update(id, user)
            return updatedUser
        } catch (error) {
            console.log(error)
            throw new InternalError("Erro ao atualizar usuário")
        }

    }

}