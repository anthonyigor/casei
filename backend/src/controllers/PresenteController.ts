import { Request, Response } from "express";
import { GetPresentesByUserService } from "../services/presenteServices/GetPresentesByUserService";
import { GetPresentesDisponiveisByUserService } from "../services/presenteServices/GetPresentesDisponiveisByUserService";
import { UploadFileToS3 } from "../services/fileServices/UploadFileToS3";

export class PresenteController {
    constructor(
        private getPresentesByUserService: GetPresentesByUserService,
        private getPresentesDisponiveisService: GetPresentesDisponiveisByUserService,
        private uploadFileService: UploadFileToS3
    ) {}

    async create(req: Request | any, res: Response) {
        const { id } = req.params
        const image = req.file
        const { nome, descricao, valor } = req.body

        // send image to s3
        const fileUrl = await this.uploadFileService.execute(image.filename, image.mimetype)
        res.status(200).json({ fileUrl })
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

}