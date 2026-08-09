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

        const pageNumber = req.query.page
        const page = req.query.page > 1 ? req.query.page : 1
        const limit = 10

        const list = await listProductService.execute({disabled: disabled,
                                                        limit: limit, 
                                                        page: page}); 

        
        const total = listProductService.getCountOfProducts(); 
        let totalPages = total/limit; 

        return res.json({
            message: "List of products", 
            data:{
                list
            }
        })
        
    }
}

export {ListProductController}