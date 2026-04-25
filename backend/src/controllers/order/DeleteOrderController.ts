import { DeleteOrderService } from "../../services/order/DeleteOrderService";
import { Request, Response } from "express";


class DeleteOrderController {
    async handle(req: Request, res: Response){
        const service = new DeleteOrderService(); 
        const { id } = req.params; 
        const deleteOrder = await service.execute({id: id as string}); 

        return res.json({deleteOrder}); 
    }
}

export {DeleteOrderController}