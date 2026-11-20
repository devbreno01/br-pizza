import {NextFunction,Request, Response } from "express"; 
import { ZodError, ZodType } from "zod";

export const validateSchema = 
    (schema: ZodType)=> async(req: Request, res:Response, next:NextFunction)=>{
        try{
            const parsed = await schema.parseAsync({
                body: req.body, 
                query: req.query, 
                params: req.params
            });
            if (parsed && typeof parsed === "object" && "body" in parsed) {
                req.body = { ...req.body, ...parsed.body as object };
            }
            return next(); 
        }catch(error){
            if(error instanceof ZodError){
                return res.status(400).json({
                    error: "Error of validation", 
                    details: error.issues.map(issue =>({
                        field: issue.path.slice(1).join("."),
                        message: issue.message
                    }))
                })
            }

            return res.status(500).json({
                error: "Erro no servidor"
            }); 
        }
    };