import { Request, Response } from "express";
import { GetPresentesByUserService } from "../services/presenteServices/GetPresentesByUserService";
import { GetPresentesDisponiveisByUserService } from "../services/presenteServices/GetPresentesDisponiveisByUserService";
import { UploadFileToS3 } from "../services/fileServices/UploadFileToS3";
import { randomUUID } from "crypto";
import { CreatePresenteService } from "../services/presenteServices/CreatePresenteService";
import { FindUserByIDService } from "../services/userServices/FindUserByIDService";
import 'express-async-errors';
import { GetPresenteService } from "../services/presenteServices/GetPresenteService";
import { UpdatePresenteService } from "../services/presenteServices/UpdatePresenteService";

export class PresenteController {
    constructor(
        private getPresentesByUserService: GetPresentesByUserService,
        private getPresentesDisponiveisService: GetPresentesDisponiveisByUserService,
        private uploadFileService: UploadFileToS3,
        private createPresenteService: CreatePresenteService,
        private findUserByEmailService: FindUserByIDService,
        private getPresenteService: GetPresenteService,
        private updatePresenteService: UpdatePresenteService
    ) {}

    async create(req: Request | any, res: Response) {
        const { id } = req.params
        const image = req.file
        const { nome, descricao, valor, url_produto } = req.body

        const valorNumber = Number(Number(valor.replace(',', '.')).toFixed(2))

        const user = await this.findUserByEmailService.execute(id)
        if (!user) return res.status(400).json({ message: 'User not found' })

        //send image to s3
        const fileUrl = await this.uploadFileService.execute(image.filename, image.mimetype)
        
        const presente: any = {
            id: randomUUID(),
            nome,
            descricao,
            url_produto,
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

    async editPresente(req: Request, res: Response) {
        const { id, presenteId } = req.params
        const image = req.file
        const { nome, descricao, valor, url_produto } = req.body

        const valorNumber = Number(Number(valor.replace(',', '.')).toFixed(2))

        const presente = await this.getPresenteService.execute(presenteId, id)

        const updatedPresente: any = {
            id: presenteId,
            nome: nome || presente.nome,
            descricao: descricao || presente.descricao,
            url_produto: url_produto || presente.url_produto,
            valor: valorNumber || presente.valor,
            image: presente.image,
            user_id: presente.user_id,
            selecionado: presente.selecionado,
            convidado_id: presente.convidado_id
        }

        if (image) {
            const fileUrl = await this.uploadFileService.execute(image.filename, image.mimetype)
            updatedPresente.image = fileUrl
        }

        await this.updatePresenteService.execute(updatedPresente)

        return res.status(200).json({ message: 'Presente atualizado' })
    }

}