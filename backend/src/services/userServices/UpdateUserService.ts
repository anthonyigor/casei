import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/UserRepository";
import bcrypt from 'bcrypt';

export class UpdateUserService {
    constructor(private userRepository: UserRepository) {}
    
    async execute(id: string, user: User) {
        const userExists = await this.userRepository.getUserByEmail(user.email)
        if(!userExists) {
            throw new Error("Usuário não encontrado")
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        try {
            const updatedUser = await this.userRepository.update(id, {...user, password: hashedPassword})
            return updatedUser
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao atualizar usuário")
        }

    }

}