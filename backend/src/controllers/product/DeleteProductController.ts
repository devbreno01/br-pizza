
import { Request, Response } from "express"; 
import { DeleteProductService } from "../../services/products/DeleteProductService";
class DeleteProductController{
    async handle(req: Request, res: Response){
       const { id } = req.params; 
    
       const deleteService = new DeleteProductService();
       const deleteProduct = await deleteService.execute({id:id as string, business_id: req.business_id});
       return res.json({deleteProduct});

    }
}

export {DeleteProductController}