import { NextFunction, Request, Response } from "express";
import { getToken } from "./get-token";
import * as jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.JWT_SECRET as string

    if (!req.headers.authorization) {
        return res.status(401).json({message: 'Unauthorized request'});
    }

    const token = getToken(req)

    if (!token) {
        return res.status(401).json({message: 'Acesso negado!'});
    }

    try {
        jwt.verify(token, secret)
        next()
    } catch (error) {
        return res.status(400).json({message: 'Token inválido!'})
    }

}