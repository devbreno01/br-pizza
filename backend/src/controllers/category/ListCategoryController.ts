import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController{
    async handle(req: Request, res: Response){
        const service = new ListCategoryService(); 
        const categories = await service.execute(); 

        if(!categories ){
            return res.status(401).json({
                error: "Erro ao listar cateogria"
            })
        }

        
        return res.json({
            message: "Listagem de categorias",
            data: categories
        });
    }
}

export {ListCategoryController}