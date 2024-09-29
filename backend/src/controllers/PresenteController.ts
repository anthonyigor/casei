import { Request, Response } from "express";
import { GetPresentesByUserService } from "../services/presenteServices/GetPresentesByUserService";
import { GetPresentesDisponiveisByUserService } from "../services/presenteServices/GetPresentesDisponiveisByUserService";
import { UploadFileToS3 } from "../services/fileServices/UploadFileToS3";
import { randomUUID } from "crypto";
import { CreatePresenteService } from "../services/presenteServices/CreatePresenteService";
import { FindUserByIDService } from "../services/userServices/FindUserByIDService";
import 'express-async-errors';
import { GetPresenteService } from "../services/presenteServices/GetPresenteService";

export class PresenteController {
    constructor(
        private getPresentesByUserService: GetPresentesByUserService,
        private getPresentesDisponiveisService: GetPresentesDisponiveisByUserService,
        private uploadFileService: UploadFileToS3,
        private createPresenteService: CreatePresenteService,
        private findUserByEmailService: FindUserByIDService,
        private getPresenteService: GetPresenteService,
    ) {}

    async create(req: Request | any, res: Response) {
        const { id } = req.params
        const image = req.file
        const { nome, descricao, valor } = req.body

        const valorNumber = Number(Number(valor.replace(',', '.')).toFixed(2))

        const user = await this.findUserByEmailService.execute(id)
        if (!user) return res.status(400).json({ message: 'User not found' })

        //send image to s3
        const fileUrl = await this.uploadFileService.execute(image.filename, image.mimetype)
        
        const presente: any = {
            id: randomUUID(),
            nome,
            descricao,
            valor: valorNumber,
            image: fileUrl,
            user_id: id,
            selecionado: false
        }

        const newPresente = await this.createPresenteService.execute(presente)
        
        res.status(200).json({ newPresente })
    }

    async getPresentes(req: Request, res: Response) {
        const { id } = req.params
        const presentes = await this.getPresentesByUserService.execute(id)
        return res.status(200).json(presentes)
    }

    async getPresentesDisponiveis(req: Request, res: Response) {
        const { id } = req.params
        const presentes = await this.getPresentesDisponiveisService.execute(id)
        return res.status(200).json(presentes)
    }

    async getPresente(req: Request, res: Response) {
        const { id, presenteId } = req.params
        const presente = await this.getPresenteService.execute(presenteId, id)
        return res.status(200).json(presente)
    }

}