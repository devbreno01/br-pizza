import { Request, Response } from "express"; 
import { CreateProductService } from "../../services/products/CreateProductService";
import { json } from "zod";

class CreateProductController{
    async handle(res: Response, req: Request){

        const createProductService = new CreateProductService(); 
        return res.status(200);json({
            message:"testingg"
        });
    }
}
export {CreateProductController}