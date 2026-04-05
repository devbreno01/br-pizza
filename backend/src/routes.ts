import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController"; 
import { AuthUserController } from "./controllers/user/AuthUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { CreateUserSchema } from "./schemas/userSchema";
import { AuthUserSchema } from "./schemas/userSchema";

const router = Router(); 
const createUser = new CreateUserController();
const authUser = new AuthUserController(); 

router.get( "/user", (req: Request,res: Response)=>{res.json({message: "teste"}); })
router.post("/user",validateSchema(CreateUserSchema), createUser.handle);

router.post("/session",validateSchema(AuthUserSchema),authUser.handle);

export { router }; 