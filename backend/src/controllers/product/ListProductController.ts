import { ListProductService } from "../../services/products/ListProductService";
import { Request, Response, NextFunction } from "express";
import { parsePageQuery } from "../../utils/utils";
class ListProductController {
    async handle(req: Request, res:Response ){
        const listProductService = new ListProductService();
       
        const disabled = req.query.disabled === "true"
                        ? true
                        : req.query.disabled === "false"
                        ? false
                        : undefined;


        const page = parsePageQuery(req.body.page); 
        const limit = parse;

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