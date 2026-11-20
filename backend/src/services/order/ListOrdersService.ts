
import { Request, Response } from "express"; 
import prismaClient from "../../prisma";

interface ItemOrderProps{
    user_id: string
    order_id: string
}

class ListOrdersItemService {
   async execute({order_id, user_id}: ItemOrderProps){
     
        try{
           
            
            const searchItem = await prismaClient.order.findFirst({
                where:{
                    id : order_id,
                    user_id
                }, 
                select:{
                    table: true, 
                    draft: true, 
                    status: true, 
                    name: true, 
                    createdAt: true, 
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
            });

           
            return searchItem; 
        }catch(error){
            throw new Error("Falha ao listar detalhes do pedido"); 
        }
    }
}

export {ListOrdersItemService}
