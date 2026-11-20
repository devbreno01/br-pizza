import { DeleteOrderService } from "../../services/order/DeleteOrderService";
import { Request, Response } from "express";


class DeleteOrderController {
    async handle(req: Request, res: Response){
        const service = new DeleteOrderService(); 
        const { id } = req.params; 
        const deleteOrder = await service.execute({id: id as string, user_id: req.user_id});

        return res.json({deleteOrder}); 
    }
}

export {DeleteOrderController}