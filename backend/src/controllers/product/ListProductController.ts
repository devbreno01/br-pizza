import { ListProductService } from "../../services/products/ListProductService";
import { Request, Response, NextFunction } from "express";
import { parseLimitQuery, parsePageQuery } from "../../utils/utils";
class ListProductController {
    async handle(req: Request, res:Response ){
        const listProductService = new ListProductService();
       
        const disabled = req.query.disabled === "true"
                        ? true
                        : req.query.disabled === "false"
                        ? false
                        : undefined;


        const page = parsePageQuery(req.query.page); 
        const limit = parseLimitQuery(req.query.limit);

        const list = await listProductService.execute({disabled: disabled,
                                                        limit: limit, 
                                                        page: page}); 

        
        const total = await listProductService.getCountOfProducts(); 
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