import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/UserRepository";
import bcrypt from "bcrypt";

export class LoginService {
    constructor(private userRepository: UserRepository) {}

    async execute(email: string, password: string): Promise<User | Error> {
        const user = await this.userRepository.getUserByEmail(email)

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            throw new Error("Senha inválida")
        }

        return user;
    }
}