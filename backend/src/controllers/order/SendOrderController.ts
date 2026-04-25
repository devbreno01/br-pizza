import { Request, Response} from "express";
import { SendOrderService } from "../../services/order/SendOrderService";

class SendOrderController {
    async handle(req: Request, res:Response){
        const service = new SendOrderService(); 
        const { order_id, name} = req.body; 
        const sendOrderKitchen = await  service.execute({
            order_id:order_id, 
            name: name
        });

        return res.json({sendOrderKitchen}); 
    }
}

export {SendOrderController}

