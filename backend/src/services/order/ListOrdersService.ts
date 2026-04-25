
import { Request, Response } from "express"; 
import prismaClient from "../../prisma";

interface ItemOrderProps{
    order_id: string
}

class ListOrdersItemService {
   async execute({order_id}: ItemOrderProps){
     
        try{
           
            
            const searchItem = await prismaClient.order.findFirst({
                where:{
                    id : order_id
                }, 
                select:{
                    table: true, 
                    draft: true, 
                    status: true, 
                    createdAt: true, 
                    itens:{
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
