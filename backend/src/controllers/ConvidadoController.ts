import { Request, Response } from "express";
import { CreateConvidadoService } from "../services/convidadoServices/CreateConvidadoService";
import { Convidado } from "@prisma/client";
import { randomUUID } from "crypto";
import { GetConvidadosByUserService } from "../services/convidadoServices/GetConvidadosByUserService";
import { GetConvidadoService } from "../services/convidadoServices/GetConvidadoService";
import { SetPresenteConvidado } from "../services/presenteServices/SetPresenteConvidado";
import { UpdateConvidadoService } from "../services/convidadoServices/UpdateConvidadoService";
import { GetPresentesConvidadoService } from "../services/presenteServices/GetPresentesConvidadoService";
import { UnsetPresenteConvidado } from "../services/presenteServices/UnsetPresenteConvidado";
import 'express-async-errors';
import { GetConvidadoByTelefoneService } from "../services/convidadoServices/GetConvidadoByTelefoneService";
import { ConfirmarPresencaConvidadoService } from "../services/convidadoServices/ConfirmarPresencaConvidadoService";
import { GetConvidadoByNomeService } from "../services/convidadoServices/GetConvidadoByNomeService";

export class ConvidadoController {
    constructor(
        private createConvidadoService: CreateConvidadoService,
        private getConvidadosByUserService: GetConvidadosByUserService,
        private getConvidadoService: GetConvidadoService,
        private setPresenteConvidado: SetPresenteConvidado,
        private updateConvidadoService: UpdateConvidadoService,
        private getPresenteConvidadoService: GetPresentesConvidadoService,
        private unsetPresenteConvidado: UnsetPresenteConvidado,
        private getConvidadoByTelefoneService: GetConvidadoByTelefoneService,
        private confirmarPresencaConvidadoService: ConfirmarPresencaConvidadoService,
        private getConvidadoByNomeService: GetConvidadoByNomeService
    ) {}

    async create(req: Request, res: Response) {
        const { nome, quant_familia, confirmado, telefone, presentes, tipo_selecao } = req.body;
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
        
        if (presentes) {
            presentes.map((presente: any) => {
                this.setPresenteConvidado.execute(presente.value, (newConvidado as any).id, user_id, tipo_selecao)
            })
        }

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

    async editConvidado(req: Request, res: Response) {
        const { nome, quant_familia, confirmado, telefone, presentes, tipo_selecao } = req.body
        const { convidadoId } = req.params
        const user_id = req.params.id;

        const convidadoExists = await this.getConvidadoService.execute(user_id, convidadoId)
        if (!convidadoExists) {
            return res.status(404).json({ message: 'Convidado não encontrado' })
        }

        const convidado: Convidado = {
            id: convidadoId,
            nome,
            quant_familia,
            confirmado,
            telefone,
            user_id
        }

        await this.updateConvidadoService.execute(convidado)

        const presentesConvidado = await this.getPresenteConvidadoService.execute(convidadoId)

        // remover presentes 
        const presentesARemover = presentesConvidado.filter((presenteConvidado) => 
            !presentes.some((presente: any) => presente.value === presenteConvidado.id)
        )
        for (const presente of presentesARemover) {
            await this.unsetPresenteConvidado.execute(presente.id)
        }

        // adicionar presentes
        const presentesAAdicionar = presentes.filter((presente: any) => 
            !presentesConvidado.some((presenteConvidado) => presenteConvidado.id === presente.value)
        )
        for (const presente of presentesAAdicionar) {
            await this.setPresenteConvidado.execute(presente.value, convidadoId, user_id, tipo_selecao)
        }

        return res.status(200).json({ message: "Convidado editado com sucesso" })
    }

    async identificateConvidado(req: Request, res: Response) {
        const { id } = req.params
        const { nome, telefone } = req.body

        const convidadoByTelefone = await this.getConvidadoByTelefoneService.execute(id, telefone)
        if (convidadoByTelefone) {
            return res.status(200).json({ convidado: convidadoByTelefone })
        }

        const convidadoByNome = await this.getConvidadoByNomeService.execute(id, nome)
        if (convidadoByNome) {
            return res.status(200).json({ convidado: convidadoByNome })
        }
        
        const convidado: Convidado = {
            id: randomUUID(),
            nome,
            quant_familia: 1,
            confirmado: false,
            telefone,
            user_id: id
        }

        const newConvidado = await this.createConvidadoService.execute(convidado)
        return res.status(200).json({ convidado: newConvidado })
    }

    async confirmarPresenca(req: Request, res: Response) {
        const { id, convidadoId } = req.params

        const convidado = await this.getConvidadoService.execute(id, convidadoId)

        if (!convidado) {
            return res.status(404).json({ message: 'Convidado não encontrado' })
        }

        await this.confirmarPresencaConvidadoService.execute(id, convidadoId)

        return res.status(200).json({ message: 'Presença confirmada' })
    }

}