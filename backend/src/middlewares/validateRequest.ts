import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';


export const validateRequestSchema = (schema: Yup.ObjectSchema<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req.body, { strict: true, abortEarly: false });
            return next();
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                return res.status(400).json({
                  error_description: err.inner.map(error => ({
                      param: error.path,
                      message: error.message,
                  })),
                });     
            }
            
            next(err)
        }
    };
}
