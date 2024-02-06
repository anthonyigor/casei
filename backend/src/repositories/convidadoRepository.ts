import { AppDataSource } from "../data-source";
import { Convidado } from "../entities/Convidado";

export const convidadoRepository = AppDataSource.getRepository(Convidado)