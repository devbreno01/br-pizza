import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

import { parsePagination } from "../../utils/utils";

class ListCategoryController{
    async handle(req: Request, res: Response){
        const service = new ListCategoryService(); 
        const { categories, ...pagination } = await service.execute(req.user_id, parsePagination(req.query));

        return res.json({
            message: "Listagem de categorias",
            data: categories,
            ...pagination
        });
    }
}

export {ListCategoryController}