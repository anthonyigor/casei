import { Request } from "express";

export const getToken = (req: Request) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        return token;
    }

    return null;

}