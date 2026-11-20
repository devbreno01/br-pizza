import prismaClient from "../../prisma";

interface SendOrderProps {
    name: string , 
    user_id: string
    order_id: string
}
class FinishOrderService {
    async execute({name, order_id, user_id} :SendOrderProps){
        try{
             const oderExists = await prismaClient.order.findFirst({
                where:{
                    id: order_id,
                    user_id
                }
            }); 

            if(!oderExists){
                throw new Error("Ordem não encontrada"); 
            }

            // Setting status true, so finish a order
            const finishOrder = await prismaClient.order.update({
                where:{
                    id: order_id,
                    user_id
                }, 
                data:{
                    status : true, 
                    name: name
                }, 
                select:{
                    id: true, 
                    table: true, 
                    name: true, 
                    draft: true, 
                    status: true, 
                    createdAt: true
                }
            }); 

            return finishOrder; 
            


        }catch(err){
            console.log(err); 
            throw new Error("Falha ao finalizar pedido"); 
        }
    }
}

export {FinishOrderService}