import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt';

export class UserController {

    async create(req: Request, res: Response) {
        const { nome, email, password, nome_parceiro, data_casamento } = req.body

        if (!nome || nome === undefined) {
            return res.status(400).json({ message: 'Nome é obrigatório!'})
        }

        if (!email || email === undefined) {
            return res.status(400).json({ message: 'Email é obrigatório!'})
        }
        
        const emailExists = await userRepository.findOne({where: {email}})
        if (emailExists) {
            return res.status(400).json({ message: 'Email já cadastrado!'})
        }

        if (!password || password === undefined) {1
            return res.status(400).json({ message: 'Password é obrigatório!'})
        }
        const hashPassword = await bcrypt.hash(password, 10)

        try {   
            const user = userRepository.create({
                nome,
                email,
                password: hashPassword,
                nome_parceiro,
                data_casamento
            })
            await userRepository.save(user)
            return res.status(201).json({message: "Usuário criado com sucesso!"})
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error"})
        }

    }

}