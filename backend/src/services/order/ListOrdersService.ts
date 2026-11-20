
import { Request, Response } from "express"; 
import prismaClient from "../../prisma";

interface ItemOrderProps{
    business_id: string
    order_id: string
}

class ListOrdersItemService {
   async execute({order_id, business_id}: ItemOrderProps){
     
        try{
           
            
            const searchItem = await prismaClient.order.findFirst({
                where:{
                    id : order_id,
                    business_id
                }, 
                select:{
                    table: true, 
                    draft: true, 
                    status: true, 
                    name: true, 
                    createdAt: true, 
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
            });

           
            return searchItem; 
        }catch(error){
            throw new Error("Falha ao listar detalhes do pedido"); 
        }
    }
}

export {ListOrdersItemService}
