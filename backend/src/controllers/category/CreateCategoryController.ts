import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController{

    async handle(req: Request , res:Response){
        console.log(req.body);
        const { name } = req.body; 
        const createCategoryService = new CreateCategoryService(); 
        const category = await createCategoryService.execute({name: name}); 

        return res.json({
            message: "Categoria criada com sucesso",
            data: category
        });
    }
}

export {CreateCategoryController}