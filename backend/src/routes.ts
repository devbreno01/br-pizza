import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController"; 
import { AuthUserController } from "./controllers/user/AuthUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { CreateUserSchema } from "./schemas/userSchema";
import { AuthUserSchema } from "./schemas/userSchema";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategorySchema } from "./schemas/categorySchema";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { isAdmin } from "./middlewares/isAdmin";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
const router = Router(); 
const createUser = new CreateUserController();
const authUser = new AuthUserController(); 
const detailUserController = new DetailUserController(); 
const createCategory = new CreateCategoryController(); 
const listCategory = new ListCategoryController(); 

router.get( "/user", (req: Request,res: Response)=>{res.json({message: "teste"}); })
router.post("/user",validateSchema(CreateUserSchema), createUser.handle);
router.post("/session",validateSchema(AuthUserSchema),authUser.handle);
router.get("/me",isAuthenticated ,detailUserController.handle);

//categories 
router.post(
    "/category",
    isAuthenticated,
    isAdmin, 
    validateSchema(CreateCategorySchema),
    createCategory.handle);

router.get(
    "/categories",
    isAuthenticated,
    listCategory.handle);


export { router }; 