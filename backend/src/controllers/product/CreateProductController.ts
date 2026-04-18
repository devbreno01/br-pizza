import { Request, Response } from "express"; 
import { CreateProductService } from "../../services/products/CreateProductService";
import { json } from "zod";

class CreateProductController{
    async handle(req: Request, res: Response){
        const {name, price, description, category_id} = req.body; 
        const createProductService = new CreateProductService(); 

        if(!req.file){
            throw new Error("A imagem do produto é obrigatória"); 
        }

        const createProduct = await createProductService.execute({
            name:name, 
            price: parseFloat(price), 
            description:description, 
            category_id:category_id,
            imageBuffer: req.file.buffer, 
            imageName: req.file.originalname
        });

        return res.json({
            message:"success", 
            data: createProduct
        });
    }
}
export {CreateProductController}