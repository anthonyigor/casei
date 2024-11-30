import { Request, Response } from "express";
import { User } from "@prisma/client";
import { createUserToken } from "../helpers/create-user-token";
import { randomUUID } from "crypto";
import { CreateUserService } from "../services/userServices/CreateUserService";
import { LoginService } from "../services/userServices/LoginService";
import { UpdateUserService } from "../services/userServices/UpdateUserService";
import 'express-async-errors';
import { GetUserCasamento } from "../services/userServices/GetUserCasamento";
import { FindUserByIDService } from "../services/userServices/FindUserByIDService";

export class UserController {
    constructor(
        private createUserService: CreateUserService,
        private loginService: LoginService,
        private updateUserService: UpdateUserService,
        private getUserCasamentoService: GetUserCasamento,
    ) {}

    async create(req: Request, res: Response) {
        const { nome, email, password, nome_parceiro, data_casamento, horario_casamento, lat, lon, endereco, chave_pix, cidade, telefone } = req.body

        const user: User = {
            id: randomUUID(),
            nome,
            email,
            password,
            nome_parceiro,
            data_casamento,
            lat,
            lon,
            endereco,
            horario: horario_casamento,
            chave_pix,
            cidade,
            telefone
        }

        await this.createUserService.execute(user)
        return res.status(201).json({ message: 'Usuário criado com sucesso!'})
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body
        const user = await this.loginService.execute(email, password)

        await createUserToken(res, user)
    }

    async update(req: Request, res: Response) {
        const { nome, email, password, nome_parceiro, data_casamento, endereco, lat, lon, horario_casamento, chave_pix, cidade, telefone } = req.body;
        const id = req.params.id;
        
        const user: User = {
            id,
            nome,
            email,
            password,
            nome_parceiro,
            data_casamento,
            lat,
            lon,
            endereco,
            horario: horario_casamento,
            chave_pix,
            cidade,
            telefone
        }
        
        const updatedUser = await this.updateUserService.execute(id, user)
        
        return res.status(200).json({ message: "Usuário atualizado com sucesso!", updatedUser });
    }

    async getUser(req: Request | any, res: Response) {
        return res.status(200).json({ user: req.user })
    }

    async getUserCasamento(req: Request, res: Response) {
        const { id } = req.params;

        const user =  await this.getUserCasamentoService.execute(id);

        return res.status(200).json({ user })
    }

}