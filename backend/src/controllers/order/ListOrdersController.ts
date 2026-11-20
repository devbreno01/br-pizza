import { Request, Response } from "express";
import { ListDetailOrderService } from "../../services/order/ListDetailOrderService";
import { parsePagination } from "../../utils/utils";

class ListOrdersController {
    async handle(req: Request, res: Response) {
        const { draft, status } = req.query;
        const isDraft = draft === "true" ? true : draft === "false" ? false : undefined;
        const isFinished = status === "true" ? true : status === "false" ? false : undefined;
        const service = new ListDetailOrderService();

        const result = await service.execute(req.user_id, parsePagination(req.query), isDraft, isFinished);
        return res.json(result);
    }
}

export { ListOrdersController };
