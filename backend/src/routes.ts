import { Router, Request, Response } from "express";
import multer from "multer";
import { CreateUserController } from "./controllers/user/CreateUserController"; 
import { AuthUserController } from "./controllers/user/AuthUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { CreateUserSchema } from "./schemas/userSchema";
import { AuthUserSchema } from "./schemas/userSchema";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategorySchema } from "./schemas/categorySchema";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { createProductSchema } from "./schemas/productSchema";
import { isAdmin } from "./middlewares/isAdmin";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductController } from "./controllers/product/ListProductController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { ListProductsByCategoryController } from "./controllers/product/ListProductsByCategoryController";
import uploadConfig from './config/multer'; 

const router = Router(); 
const upload = multer(uploadConfig);

const createUser = new CreateUserController();
const authUser = new AuthUserController(); 
const detailUserController = new DetailUserController(); 
const createCategory = new CreateCategoryController(); 
const listCategory = new ListCategoryController(); 
const createProduct = new CreateProductController(); 
const listProduct = new ListProductController(); 
const deleteProduct = new DeleteProductController();

const listProductsCategory = new ListProductsByCategoryController();

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

//products 

router.post(
    "/products", 
    isAuthenticated, 
    isAdmin,
    upload.single("file"),
    validateSchema(createProductSchema),
    createProduct.handle);


router.get(
    "/products",
    isAuthenticated,
    listProduct.handle);


    
router.delete(
    "/products/:id",
    isAuthenticated,
    deleteProduct.handle);

router.get(
    "/products/:category_id",
    isAuthenticated,
    listProductsCategory.handle);


export { router }; 