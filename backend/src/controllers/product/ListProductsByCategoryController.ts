import { Request, Response } from "express";
import { ListProductsByCategoryService } from "../../services/products/ListProductsByCategoryService";
import { parsePagination } from "../../utils/utils";

class ListProductsByCategoryController {
    async handle(req: Request, res: Response) {
        const service = new ListProductsByCategoryService();
        const { category_id } = req.params;
        const { list, ...pagination } = await service.execute(
            category_id as string,
            req.user_id,
            parsePagination(req.query)
        );

        return res.json({ message: "List of products", data: { list }, ...pagination });
    }
}

export { ListProductsByCategoryController };
