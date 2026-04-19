import { Request, Response, NextFunction } from "express";
import { ListProductsByCategoryService } from "../../services/products/ListProductsByCategoryService";

class ListProductsByCategoryController{
   async handle(req: Request, res:Response ){
        const listProductService = new ListProductsByCategoryService();
       
        const {category_id} = req.params; 


        const list = await listProductService.execute(category_id as string); 

        return res.json({
            message: "List of products", 
            data:{
                list
            }
        })
        
    }
}

export {ListProductsByCategoryController}