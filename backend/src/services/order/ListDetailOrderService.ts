import prismaClient from "../../prisma";
import { Pagination, paginationMetadata, paginationOffset } from "../../utils/utils";

class ListDetailOrderService {
    async execute(user_id: string, pagination: Pagination, draft?: boolean, status?: boolean) {
        const where = { user_id, draft, status };
        const [listOrders, total] = await prismaClient.$transaction([
            prismaClient.order.findMany({
                where,
                ...paginationOffset(pagination),
                orderBy: [{ createdAt: "desc" }, { id: "desc" }],
                select:{
                    id:true,
                    table: true,
                    status: true,
                    draft: true,
                    name: true,
                    itens:{
                        where: { product: { category: { user_id } } },
                        select:{
                            id: true,
                            amount:true,
                            product: {
                                select:{
                                    name: true,
                                    price: true,
                                    description: true,
                                    banner: true,
                                    disabled: true
                                }
                            }
                        }
                    }
                }
            }),
            prismaClient.order.count({ where })
        ]);

        return { listOrders, ...paginationMetadata(pagination, total) };
    }
}

export { ListDetailOrderService };
