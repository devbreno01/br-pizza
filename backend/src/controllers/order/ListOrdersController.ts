
import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService";

class ListOrdersController {
     async handle(req: Request, res: Response){

        const { draft } = req.query; 
        let isDraft: boolean | undefined;

        if (draft === "true") {
            isDraft = true;
        } else if (draft === "false") {
            isDraft = false;
        }
        const listOrdersService = new ListOrdersService();


        const listOrders = await  listOrdersService.execute(isDraft);

        return res.json({listOrders}); 
    }

}


export {ListOrdersController}