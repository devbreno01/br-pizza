import { ListOrdersItemService } from "../../services/order/ListOrdersService";

import { Request, Response } from "express";


class ListOrderDetailController {
    async  handle(req: Request, res: Response)
    {
        
        const service = new ListOrdersItemService(); 
        const  id = req.params.id; 
        const listDetails  = await service.execute({order_id: id as string, business_id: req.business_id});

       return res.json(listDetails);
    }
}

export {ListOrderDetailController}