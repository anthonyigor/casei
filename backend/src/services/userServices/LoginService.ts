import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/UserRepository";
import bcrypt from "bcryptjs";
import { NotFound } from "../../errors/NotFound";
import { BadRequest } from "../../errors/BadRequest";

export class LoginService {
    constructor(private userRepository: UserRepository) {}

    async execute(email: string, password: string): Promise<User | Error> {
        const user = await this.userRepository.getUserByEmail(email)
        if (!user) {
            throw new NotFound("Usuário não encontrado")
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            throw new BadRequest("Senha inválida")
        }

        return user;
    }
}