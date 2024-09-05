import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/UserRepository";
import bcrypt from 'bcrypt';
import "express-async-errors"; 
import { Conflict } from "../../errors/Conflict";
import { InternalError } from "../../errors/InternalError";

export class CreateUserService {
    constructor(private userRepository: UserRepository) {}

    async execute(user: User) {
        const userExists = await this.userRepository.getUserByEmail(user.email)

        if (userExists) {
            throw new Conflict('Usuário já existe')
        }

        const hashPassword = await bcrypt.hash(user.password, 10)
        
        try {
            const newUser = await this.userRepository.create({...user, password: hashPassword})
            return newUser;
        } catch (error) {
            throw new InternalError('Erro ao criar usuário')
        }

    }
}