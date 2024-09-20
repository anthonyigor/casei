import { Request, Response } from "express";
import { CreateConvidadoService } from "../services/convidadoServices/CreateConvidadoService";
import { Convidado } from "@prisma/client";
import { randomUUID } from "crypto";
import { GetConvidadosByUserService } from "../services/convidadoServices/GetConvidadosByUserService";
import 'express-async-errors';
import { GetConvidadoService } from "../services/convidadoServices/GetConvidadoService";

export class ConvidadoController {
    constructor(
        private createConvidadoService: CreateConvidadoService,
        private getConvidadosByUserService: GetConvidadosByUserService,
        private getConvidadoService: GetConvidadoService
    ) {}

    async create(req: Request, res: Response) {
        const { nome, quant_familia, confirmado, telefone } = req.body;
        const user_id = req.params.id;

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
        const { id } = req.params;

        const convidados = await this.getConvidadosByUserService.execute(id)
        return res.status(200).json(convidados)
    }

    async getConvidado(req: Request, res: Response) {
        const { id, convidadoId } = req.params
        const convidado = await this.getConvidadoService.execute(id, convidadoId)
        return res.status(200).json(convidado)
    }

}