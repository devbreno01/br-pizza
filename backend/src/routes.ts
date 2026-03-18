import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController"; 
import { validateSchema } from "./middlewares/validateSchema";
import { CreateUserSchema } from "./schemas/userSchema";
const router = Router(); 
const createUser = new CreateUserController();
router.get("/user",(req: Request,res: Response)=>{
    res.json({message: "teste"}); 
})

router.post("/user",validateSchema(CreateUserSchema), createUser.handle)

export { router }; 