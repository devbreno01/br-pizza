import prismaClient from "../../prisma";
import { Pagination, paginationMetadata, paginationOffset } from "../../utils/utils";

class ListProductsByCategoryService {
    async execute(category_id: string, user_id: string, pagination: Pagination) {
        const where = { category_id, category: { user_id }, disabled: false };
        const [list, total] = await prismaClient.$transaction([
            prismaClient.product.findMany({
                where,
                ...paginationOffset(pagination),
                orderBy: [{ name: "asc" }, { id: "asc" }],
                select:{
                    name: true,
                    price: true,
                    description: true,
                    banner: true,
                    category_id: true
                }
            }),
            prismaClient.product.count({ where })
        ]);

        return { list, ...paginationMetadata(pagination, total) };
    }
}

export { ListProductsByCategoryService };
