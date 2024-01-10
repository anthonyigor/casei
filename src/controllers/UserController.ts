import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import { User } from "../entities/User";
import { createUserToken } from "../helpers/create-user-token";

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

    async login(req: Request, res: Response) {
        const { email, password } = req.body

        if (!email || email === undefined) {
            return res.status(400).json({ message: 'Email é obrigatório!'})
        }
        
        if (!password || password === undefined) {
            return res.status(400).json({ message: 'A senha é obrigatória!'})
        }

        const user = await userRepository.findOne({where: {email}})
        
        if (!user) {
            return res.status(400).json({message: "Email incorreto!"})
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(400).json({message: "Senha incorreta!"})
        }

        await createUserToken(res, user)

    }

    async update(req: Request, res: Response) {
        const { nome, email, password, nome_parceiro, data_casamento } = req.body;
        const id = req.params.id;
        
        try {
            let user = await userRepository.findOne({ where: { id: Number(id) } });
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado!" });
            }
        
            const updateFields = {} as User;

            if (nome !== undefined && nome !== user.nome) {
                updateFields.nome = nome;
            }
        
            if (email !== undefined && email !== user.email) {
                const emailExists = await userRepository.findOne({ where: { email } });
                if (emailExists) {
                    return res.status(400).json({ message: 'Email já cadastrado!' });
                }
                updateFields.email = email;
            }
        
            if (password !== undefined) {
                const hashPassword = await bcrypt.hash(password, 10);
                updateFields.password = hashPassword;
            }
        
            if (nome_parceiro !== undefined && nome_parceiro !== user.nome_parceiro) {
                updateFields.nome_parceiro = nome_parceiro;
            }
        
            if (data_casamento !== undefined && data_casamento !== user.data_casamento) {
                updateFields.data_casamento = data_casamento;
            }
            
            if (Object.keys(updateFields).length === 0) {
                return res.status(400).json({ message: "Nenhum campo foi alterado." });
            }
            
            await userRepository.update({ id: Number(id) }, updateFields);
            
            user = await userRepository.findOne({ where: { id: Number(id) } }); 
            
            return res.status(200).json({ message: "Usuário atualizado com sucesso!", user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ocorreu um erro ao atualizar o usuário." });
        }
        

    }

}