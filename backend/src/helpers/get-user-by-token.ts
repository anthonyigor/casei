import * as jwt from "jsonwebtoken";
import { convidadoRepository } from "../repositories/ConvidadoRepository";

export const getUserByToken = async(token: any) => {

    if (!token) {
        return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const userId = decoded.user.id;

    const user = await convidadoRepository.findOne({where: {id: userId}})
    
    return user;
}