import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController"; 
const router = Router(); 
const createUser = new CreateUserController();
router.get("/user",(req: Request,res: Response)=>{
    res.json({message: "teste"}); 
})

router.post("/user",createUser.handle)

export { router }; 