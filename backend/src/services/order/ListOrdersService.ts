
import { Request, Response } from "express"; 
import prismaClient from "../../prisma";

class ListOrdersService {
    async execute(draft?: boolean){

        console.log(draft);
        try{
            const listOrders = await prismaClient.order.findMany({
                where:{
                    ...(draft !== undefined && { draft })
                }, 
                select:{
                    table: true, 
                    status: true, 
                    draft: true, 
                    name: true 
                }
            })

            return listOrders; 
        }catch(error){
            throw new Error("Erro ao exibir listagem")
        }
    }
}

export {ListOrdersService}
