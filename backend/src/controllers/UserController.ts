import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { User } from "@prisma/client";
import { createUserToken } from "../helpers/create-user-token";
import { randomUUID } from "crypto";
import { CreateUserService } from "../services/userServices/CreateUserService";
import { LoginService } from "../services/userServices/LoginService";
import { UpdateUserService } from "../services/userServices/UpdateUserService";

export class UserController {
    constructor(
        private createUserService: CreateUserService,
        private loginService: LoginService,
        private updateUserService: UpdateUserService
    ) {}

    async create(req: Request, res: Response) {
        const { nome, email, password, nome_parceiro, data_casamento } = req.body

        if (!nome || nome === undefined) {
            return res.status(400).json({ message: 'Nome é obrigatório!'})
        }

        if (!email || email === undefined) {
            return res.status(400).json({ message: 'Email é obrigatório!'})
        }

        const user: User = {
            id: randomUUID(),
            nome,
            email,
            password,
            nome_parceiro,
            data_casamento,
        }

        await this.createUserService.execute(user)
        return res.status(201).json({ message: 'Usuário criado com sucesso!'})
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body

        if (!email || email === undefined) {
            return res.status(400).json({ message: 'Email é obrigatório!'})
        }
        
        if (!password || password === undefined) {
            return res.status(400).json({ message: 'A senha é obrigatória!'})
        }

        const user = await this.loginService.execute(email, password)

        await createUserToken(res, user)
    }

    async update(req: Request, res: Response) {
        const { nome, email, password, nome_parceiro, data_casamento } = req.body;
        const id = req.params.id;
        
        const user: User = {
            id,
            nome,
            email,
            password,
            nome_parceiro,
            data_casamento,
        }
        
        const updatedUser = await this.updateUserService.execute(id, user)
        
        return res.status(200).json({ message: "Usuário atualizado com sucesso!", updatedUser });
    }

}