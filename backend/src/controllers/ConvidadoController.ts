import { Request, Response } from "express";
import { CreateConvidadoService } from "../services/convidadoServices/CreateConvidadoService";
import { Convidado } from "@prisma/client";
import { randomUUID } from "crypto";
import { GetConvidadosByUserService } from "../services/convidadoServices/GetConvidadosByUserService";

export class ConvidadoController {
    constructor(
        private createConvidadoService: CreateConvidadoService,
        private getConvidadosByUserService: GetConvidadosByUserService
    ) {}

    async create(req: Request, res: Response) {
        const { nome, quant_familia, confirmado, telefone } = req.body;
        const user_id = req.params.id;

        if (!nome || nome === undefined) {
            return res.status(400).json({ message: "Nome é obrigatório" }); 
        }
        
        if (!telefone || telefone === undefined) {
            return res.status(400).json({ message: "Telefone é obrigatório" }); 
        }

        const convidado: Convidado = {
            id: randomUUID(),
            nome,
            quant_familia,
            confirmado,
            telefone,
            user_id
        }
        const newConvidado = await this.createConvidadoService.execute(convidado)

        return res.status(201).json({message: "Convidado criado com sucesso!", newConvidado})

    }

    async getConvidados(req: Request, res: Response) {
        const { email } = req.body

        const convidados = await this.getConvidadosByUserService.execute(email)
        return res.status(200).json(convidados)
    }

}