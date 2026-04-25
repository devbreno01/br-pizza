/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         admin:
 *           type: boolean
 *       required:
 *         - name
 *         - email
 *         - password
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *       required:
 *         - name
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         price:
 *           type: string
 *         description:
 *           type: string
 *         banner:
 *           type: string
 *         category_id:
 *           type: string
 *       required:
 *         - name
 *         - price
 *         - description
 *         - category_id
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         table:
 *           type: number
 *         draft:
 *           type: boolean
 *         status:
 *           type: boolean
 *         user_id:
 *           type: string
 *       required:
 *         - table
 *         - draft
 *         - status
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         amount:
 *           type: number
 *         order_id:
 *           type: string
 *         product_id:
 *           type: string
 *       required:
 *         - amount
 *         - order_id
 *         - product_id
 */

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
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";
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
const deleteOrder = new DeleteOrderController(); 



/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao@example.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "senha123"
 *           example:
 *             name: "João Silva"
 *             email: "joao@example.com"
 *             password: "senha123"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/user",validateSchema(CreateUserSchema), createUser.handle);

/**
 * @swagger
 * /session:
 *   post:
 *     summary: Authenticate user and get token
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *           example:
 *             email: "joao@example.com"
 *             password: "senha123"
 *     responses:
 *       200:
 *         description: Authentication successful, returns user and token
 *       401:
 *         description: Invalid credentials
 */
router.post("/session",validateSchema(AuthUserSchema),authUser.handle);

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get authenticated user details
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get("/me",isAuthenticated ,detailUserController.handle);

//categories 

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category (Admin only)
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: "Pizzas"
 *           example:
 *             name: "Pizzas"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.post(
    "/category",
    isAuthenticated,
    isAdmin, 
    validateSchema(CreateCategorySchema),
    createCategory.handle);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: List all categories
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/categories",
    isAuthenticated,
    listCategory.handle);

//products 

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - description
 *               - category_id
 *               - file
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: "Pizza Margherita"
 *               price:
 *                 type: string
 *                 example: "45.90"
 *               description:
 *                 type: string
 *                 minLength: 3
 *                 example: "Pizza de queijo mozzarela fresco com tomates"
 *               category_id:
 *                 type: string
 *                 example: "category-id-123"
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Product image file
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.post(
    "/products", 
    isAuthenticated, 
    isAdmin,
    upload.single("file"),
    validateSchema(createProductSchema),
    createProduct.handle);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: List all products
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/products",
    isAuthenticated,
    listProduct.handle);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product (Admin only)
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "product-id-123"
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Product not found
 */
router.delete(
    "/products/:id",
    isAuthenticated,
    deleteProduct.handle);

/**
 * @swagger
 * /category/product/{category_id}:
 *   get:
 *     summary: List products by category
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *         example: "category-id-123"
 *     responses:
 *       200:
 *         description: List of products in the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
router.get(
    "/category/product/:category_id",
    isAuthenticated,
    listProductsCategory.handle);

//orders 

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - table
 *               - draft
 *               - status
 *             properties:
 *               table:
 *                 type: number
 *                 example: 5
 *               draft:
 *                 type: boolean
 *                 example: true
 *               status:
 *                 type: boolean
 *                 example: false
 *           example:
 *             table: 5
 *             draft: true
 *             status: false
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/orders", 
    isAuthenticated,
    validateSchema(CreateOrderSchema), 
    createOrder.handle
);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: List all orders
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/orders", 
    isAuthenticated, 
    listOrders.handle
);

/**
 * @swagger
 * /order/add:
 *   post:
 *     summary: Add item to order
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - order_id
 *               - product_id
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 2
 *               order_id:
 *                 type: string
 *                 example: "order-id-123"
 *               product_id:
 *                 type: string
 *                 example: "product-id-456"
 *           example:
 *             amount: 2
 *             order_id: "order-id-123"
 *             product_id: "product-id-456"
 *     responses:
 *       201:
 *         description: Item added to order successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order or product not found
 */
router.post(
    "/order/add", 
    isAuthenticated, 
    validateSchema(AddItemSchema), 
    addItemOrder.handle
)

/**
 * @swagger
 * /order/remove/{id}:
 *   delete:
 *     summary: Remove item from order
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID
 *         example: "item-id-789"
 *     responses:
 *       200:
 *         description: Item removed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 */
router.delete(
    "/order/remove/:id", 
    isAuthenticated, 
    removeItem.handle
); 

/**
 * @swagger
 * /order/detail/{id}:
 *   get:
 *     summary: Get order details with items
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *         example: "order-id-123"
 *     responses:
 *       200:
 *         description: Order details with items
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
router.get(
    "/order/detail/:id", 
    isAuthenticated, 
    listOrderDetails.handle
)

/**
 * @swagger
 * /order/send:
 *   put:
 *     summary: Send/prepare order
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *               - name
 *             properties:
 *               order_id:
 *                 type: string
 *                 example: "order-id-123"
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *           example:
 *             order_id: "order-id-123"
 *             name: "João Silva"
 *     responses:
 *       200:
 *         description: Order sent successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
router.put(
    "/order/send", 
    isAuthenticated, 
    validateSchema(updateOrderSchema), 
    sendOrder.handle
)

/**
 * @swagger
 * /order/finish:
 *   put:
 *     summary: Finish/complete order
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *               - name
 *             properties:
 *               order_id:
 *                 type: string
 *                 example: "order-id-123"
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *           example:
 *             order_id: "order-id-123"
 *             name: "João Silva"
 *     responses:
 *       200:
 *         description: Order finished successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
router.put(
    "/order/finish", 
    isAuthenticated, 
    validateSchema(updateOrderSchema), 
    finishOrder.handle
)

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Delete order
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *         example: "order-id-123"
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
router.delete(
    "/order/:id", 
    isAuthenticated, 
    deleteOrder.handle
)


export { router }; 