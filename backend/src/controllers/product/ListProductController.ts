import { ListProductService } from "../../services/products/ListProductService";
import { Request, Response, NextFunction } from "express";
class ListProductController {
    async handle(req: Request, res:Response ){
        const listProductService = new ListProductService();
       
        const disabled = req.query.disabled === "true"
                        ? true
                        : req.query.disabled === "false"
                        ? false
                        : undefined;


        const list = await listProductService.execute({disabled: disabled}); 

        return res.json({
            message: "List of products", 
            data:{
                list
            }
        })
        
    }
}

export {ListProductController}