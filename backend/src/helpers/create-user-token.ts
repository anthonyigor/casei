import { Response } from "express";
import * as jwt from "jsonwebtoken";
import { InternalError } from "../errors/InternalError";

export const createUserToken = async(res: Response, user: any) => {
    const secret = process.env.JWT_SECRET as string

    try {
        const token = jwt.sign({
            user
        }, secret, {
            expiresIn: '5d'
        })

        res.status(200).json({token})
    } catch (error: any) {
        throw new InternalError(error.message)
    }

}