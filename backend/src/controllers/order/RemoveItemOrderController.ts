import { Request, Response} from "express";
import { RemoveItemOrderService } from "../../services/order/RemoveItemOrderService";

class RemoveItemOrderController{
    async handle(req: Request, res:Response){
        console.log('Entrou controller'); 
        const service = new RemoveItemOrderService(); 
        const id = req.params.id; 
        
     
        const removeItem = await service.execute({
           id:id as string 
        });
        
        const message = removeItem.message; 
        return res.json({message}); 
    }
}

export {RemoveItemOrderController}