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
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { ListProductsByCategoryController } from "./controllers/product/ListProductsByCategoryController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import uploadConfig from './config/multer'; 
import { CreateOrderSchema } from "./schemas/orderSchema";
import { AddItemOrderController } from "./controllers/order/AddItemOrderController";
import { AddItemSchema } from "./schemas/orderSchema";
import { RemoveItemOrderController } from "./controllers/order/RemoveItemOrderController";
import { ListOrderDetailController } from "./controllers/order/ListOrderDetailController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { updateOrderSchema } from "./schemas/orderSchema";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
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
const createOrder =  new CreateOrderController(); 
const listProductsCategory = new ListProductsByCategoryController();
const listOrders = new ListOrdersController(); 
const addItemOrder = new AddItemOrderController();
const removeItem = new RemoveItemOrderController(); 
const listOrderDetails = new ListOrderDetailController(); 
const sendOrder = new SendOrderController();
const finishOrder = new FinishOrderController(); 


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
    "/category/product/:category_id",
    isAuthenticated,
    listProductsCategory.handle);

//orders 
router.post(
    "/orders", 
    isAuthenticated,
    validateSchema(CreateOrderSchema), 
    createOrder.handle
);

router.get(
    "/orders", 
    isAuthenticated, 
    listOrders.handle
);


router.post(
    "/order/add", 
    isAuthenticated, 
    validateSchema(AddItemSchema), 
    addItemOrder.handle
)

router.delete(
    "/order/remove/:id", 
    isAuthenticated, 
    removeItem.handle
); 

router.get(
    "/order/detail/:id", 
    isAuthenticated, 
    listOrderDetails.handle
)

router.put(
    "/order/send", 
    isAuthenticated, 
    validateSchema(updateOrderSchema), 
    sendOrder.handle
)

router.put(
    "/order/finish", 
    isAuthenticated, 
    validateSchema(updateOrderSchema), 
    finishOrder.handle
)
export { router }; 