import { Request, Response } from "express";
import { GetPresentesByUserService } from "../services/presenteServices/GetPresentesByUserService";
import { GetPresentesDisponiveisByUserService } from "../services/presenteServices/GetPresentesDisponiveisByUserService";

export class PresenteController {
    constructor(
        private getPresentesByUserService: GetPresentesByUserService,
        private getPresentesDisponiveisService: GetPresentesDisponiveisByUserService
    ) {}

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