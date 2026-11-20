import prismaClient from "../../prisma";
import { Pagination, paginationMetadata, paginationOffset } from "../../utils/utils";

class ListCategoryService {
    async execute(user_id: string, pagination: Pagination) {
        const where = { user_id };
        const [categories, total] = await prismaClient.$transaction([
            prismaClient.category.findMany({
                where,
                ...paginationOffset(pagination),
                orderBy: [{ name: "asc" }, { id: "asc" }],
                select:{
                    id: true,
                    name: true,
                    createdAt: true
                }
            }),
            prismaClient.category.count({ where })
        ]);

        return { categories, ...paginationMetadata(pagination, total) };
    }
}

export { ListCategoryService };
