import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/UserRepository";

export class FindUserByIDService {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string): Promise<User | null> {
        return this.userRepository.getUserById(id);
    }
}