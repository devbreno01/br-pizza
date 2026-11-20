import prismaClient from "../../prisma";
import { Pagination, paginationMetadata, paginationOffset } from "../../utils/utils";

class ListDetailOrderService {
    async execute(business_id: string, pagination: Pagination, draft?: boolean, status?: boolean) {
        const where = { business_id, draft, status };
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
                        where: { product: { business_id, category: { business_id } } },
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
