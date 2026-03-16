import { Router, Request, Response } from "express";

const router = Router(); 

router.get("/user",(req: Request,res: Response)=>{
    res.json({message: "teste"}); 
})

router.post("/user",(req: Request,res: Response)=>{
    res.json({message: "teste"}); 
})

export { router }; 