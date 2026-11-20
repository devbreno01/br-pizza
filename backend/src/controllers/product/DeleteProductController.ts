
import { Request, Response } from "express"; 
import { DeleteProductService } from "../../services/products/DeleteProductService";
class DeleteProductController{
    async handle(req: Request, res: Response){
       const { id } = req.params; 
    
       const deleteService = new DeleteProductService();
       const deleteProduct = await deleteService.execute({id:id as string, user_id: req.user_id});
       return res.json({deleteProduct});

    }
}

export {DeleteProductController}