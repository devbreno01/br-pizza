import { FinishOrderService } from "../../services/order/FinishOrderService"
import { Request, Response } from "express"
class FinishOrderController{
    async handle(req:Request, res:Response){
        const service = new FinishOrderService(); 
        const { order_id, name} = req.body; 
        const finishOrder = await  service.execute({
            order_id:order_id, 
            name: name
        });

        return res.json({finishOrder}); 
    }   
}

export {FinishOrderController}