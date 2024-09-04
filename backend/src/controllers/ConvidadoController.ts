import { Request, Response } from "express";
import { ConvidadoRepository } from "../repositories/ConvidadoRepository";
import { userRepository } from "../repositories/UserRepository";
import { getUserByToken } from "../helpers/get-user-by-token";
import { getToken } from "../helpers/get-token";
import getUserByEmail from "../services/userServices/getUserByEmail";
import { CreateConvidadoService } from "../services/convidadoServices/CreateConvidadoService";
import { Convidado } from "@prisma/client";
import { randomUUID } from "crypto";

export class ConvidadoController {
    constructor(private createConvidadoService: CreateConvidadoService) {}

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

        const user = await getUserByEmail(email)

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }

        const convidados = await ConvidadoRepository.find({where: {user: {id: user.id}}})
        
        return res.status(200).json(convidados)
    }

}