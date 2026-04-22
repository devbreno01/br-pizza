import { Request, Response} from "express";
import { AddItemOrderService } from "../../services/order/AddItemOrderService";

class AddItemOrderController{
    async handle(req: Request, res:Response){
        const service = new AddItemOrderService(); 
        const {amount, product_id, order_id} = req.body; 
        const addItem = await service.execute({
            amount: amount, 
            product_id: product_id, 
            order_id: order_id
        });
        
        
        return res.json({addItem}); 
    }
}

export {AddItemOrderController}