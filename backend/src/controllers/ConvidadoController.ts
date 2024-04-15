import { Request, Response } from "express";
import { convidadoRepository } from "../repositories/convidadoRepository";
import { userRepository } from "../repositories/userRepository";
import { getUserByToken } from "../helpers/get-user-by-token";
import { getToken } from "../helpers/get-token";

export class ConvidadoController {

    async create(req: Request, res: Response) {
        const { nome, quant_familia, confirmado, presente, telefone } = req.body;
        const user_id = req.params.id;

        const user = await userRepository.findOne({where: {id: Number(user_id)}})
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }

        if (!nome || nome === undefined) {
            return res.status(400).json({ message: "Nome é obrigatório" }); 
        }
        
        if (!telefone || telefone === undefined) {
            return res.status(400).json({ message: "Telefone é obrigatório" }); 
        }

        try {
            const convidado = convidadoRepository.create({
                nome,
                quant_familia,
                confirmado,
                presente,
                user,
                telefone
            })

            await convidadoRepository.save(convidado)
            return res.status(201).json({message: "Convidado criado com sucesso!"})
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ocorreu um erro ao criar o convidado." }); 
        
        }

    }

    async getConvidados(req: Request, res: Response) {
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }

        const convidados = await convidadoRepository.find({where: {user: {id: user.id}}})
        
        return res.status(200).json(convidados)
    }

}