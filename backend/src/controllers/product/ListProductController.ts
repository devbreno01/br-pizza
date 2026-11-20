import { ListProductService } from "../../services/products/ListProductService";
import { Request, Response, NextFunction } from "express";
import { parsePagination } from "../../utils/utils";
class ListProductController {
    async handle(req: Request, res:Response ){
        const listProductService = new ListProductService();
       
        const disabled = req.query.disabled === "true"
                        ? true
                        : req.query.disabled === "false"
                        ? false
                        : undefined;


        const { page, limit } = parsePagination(req.query);

        const list = await listProductService.execute({user_id: req.user_id, disabled: disabled,
                                                        limit: limit, 
                                                        page: page}); 

        
        const total = await listProductService.getCountOfProducts(req.user_id, disabled);
        let totalPages = Math.ceil(total/limit); 

        return res.json({
            message: "List of products", 
            data:{
                list
            }, 
            page: page, 
            limit: limit, 
            totalPages: totalPages
        })
        
    }
}

export {ListProductController}