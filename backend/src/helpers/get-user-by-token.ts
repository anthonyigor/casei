import * as jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";

export const getUserByToken = async(token: any) => {

    if (!token) {
        return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const userId = decoded.user.id;

    const user = await new UserRepository().getUserById(userId)
    
    return user;
}