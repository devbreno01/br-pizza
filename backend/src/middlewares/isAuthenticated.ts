import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"; 

export function isAuthenticated(req: Request, res: Response, next: NextFunction){
    
    const authToken = req.headers.authorization;
   
    if(!authToken){
        return res.status(401).json({
            error: "Token não enviado"
        });
    }
    const [,token] = authToken.split(" "); 

    if (!token) {
        return res.status(401).json({
            error: "Token mal formatado"
        });
    }
    try{
        const payload = verify(token, process.env.JWT_SECRET as string);
        if (typeof payload === "string" || typeof payload.sub !== "string" || !payload.sub) {
            return res.status(401).json({ error: "Token inválido" });
        }

        //inserting user_id into the body of the requisition 

        req.user_id = payload.sub;
       
    }catch(error){
         return res.status(401).json({
            error: "Token inválido"
        });
    }
    return next(); 
}
