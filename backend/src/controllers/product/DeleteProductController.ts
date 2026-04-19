
import { Request, Response } from "express"; 
import { DeleteProductService } from "../../services/products/DeleteProductService";
class DeleteProductController{
    async handle(req: Request, res: Response){
       const { id } = req.params; 
    
       const deleteService = new DeleteProductService();
       const deleteProduct = await deleteService.execute({id:id as string});
       return res.json({deleteProduct});

    }
}

export {DeleteProductController}