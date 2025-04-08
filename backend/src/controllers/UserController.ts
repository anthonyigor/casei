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
import { UploadFileToS3 } from "../services/fileServices/UploadFileToS3";
import { UpdateConviteService } from "../services/userServices/UpdateConviteService";
import { UpdatePasswordService } from "../services/userServices/UpdatePasswordService";
import { DashboardService } from "../services/userServices/DashboardService";

export class UserController {
    constructor(
        private createUserService: CreateUserService,
        private loginService: LoginService,
        private updateUserService: UpdateUserService,
        private getUserCasamentoService: GetUserCasamento,
        private findUserByIdService: FindUserByIDService,
        private uploadFileService: UploadFileToS3,
        private upadteConviteUrlService: UpdateConviteService,
        private updatePasswordService: UpdatePasswordService,
        private dashboardService: DashboardService
    ) {}

    async create(req: Request, res: Response) {
        const { nome, email, password, nome_parceiro, data_casamento, horario_casamento, lat, lon, endereco, endereco_entrega, chave_pix, cidade, telefone } = req.body

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
            endereco_entrega,
            horario: horario_casamento,
            chave_pix,
            convite_url: null,
            mensagem_agradecimento: null,
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
        const { nome, email, nome_parceiro, data_casamento, endereco, endereco_entrega, lat, lon, horario_casamento, chave_pix, cidade, telefone, mensagem_agradecimento } = req.body;
        const id = req.params.id;

        const userExists = await this.findUserByIdService.execute(id)
        if (!userExists) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }
        
        const user: User = {
            id,
            nome,
            email,
            password: userExists.password,
            nome_parceiro,
            data_casamento,
            lat: String(lat),
            lon: String(lon),
            endereco,
            endereco_entrega,
            horario: horario_casamento,
            chave_pix,
            convite_url: userExists.convite_url,
            cidade,
            telefone,
            mensagem_agradecimento
        }

        const updatedUser = await this.updateUserService.execute(id, user)
        
        return res.status(200).json({ message: "Usuário atualizado com sucesso!", updatedUser });
    }

    async getUser(req: Request | any, res: Response) {
        const user = await this.findUserByIdService.execute(req.user.id)
        return res.status(200).json({ user })
    }

    async getUserCasamento(req: Request, res: Response) {
        const { id } = req.params;

        const user =  await this.getUserCasamentoService.execute(id);

        return res.status(200).json({ user })
    }

    async uploadConvite(req: Request, res: Response) {
        const { id } = req.params;
        const file: any = req.file;

        const fileUrl = await this.uploadFileService.execute(file.filename, file.mimetype)

        const updatedUser = await this.upadteConviteUrlService.execute(id, fileUrl)

        return res.status(200).json({ fileUrl: updatedUser.convite_url })
    }

    async updatePassword(req: Request | any, res: Response) {
        const user = req.user
        const { password, newPassword } = req.body;

        await this.updatePasswordService.execute(user.id, password, newPassword)

        return res.status(200).json({ message: "Senha atualizada com sucesso!" })
    }

    async dashboard(req: Request | any, res: Response) {
        const dashboard = await this.dashboardService.execute(req.user.id)

        return res.status(200).json(dashboard)
    }

}