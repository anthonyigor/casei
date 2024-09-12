import { Request, Response } from "express";
import { GetPresentesByUserService } from "../services/presenteServices/GetPresentesByUserService";

export class PresenteController {
    constructor(private getPresentesByUserService: GetPresentesByUserService) {}

    async getPresentes(req: Request, res: Response) {
        const { id } = req.params
        const presentes = await this.getPresentesByUserService.execute(id)
        return res.status(200).json(presentes)
    }

}