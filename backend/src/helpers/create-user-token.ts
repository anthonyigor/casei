import { Response } from "express";
import { User } from "../entities/User";
import * as jwt from "jsonwebtoken";

export const createUserToken = async(res: Response, user: User) => {
    const secret = process.env.JWT_SECRET as string

    try {
        const token = jwt.sign({
            user
        }, secret, {
            expiresIn: '2h'
        })

        res.status(200).json({token})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error!', error})
    }

}