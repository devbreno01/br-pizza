import prismaClient from "../../prisma";

interface deleteOrderProps{
    user_id: string
    id: string
}

class DeleteOrderService {
    async execute ({id, user_id}: deleteOrderProps){
        try{
            const oderExists = await prismaClient.order.findFirst({
                where:{
                    id: id,
                    user_id
                }
            }); 

            if(!oderExists){
                throw new Error("Ordem não encontrada"); 
            }
            
            const deleteOrder = await prismaClient.order.delete({
                where: {
                    id: id,
                    user_id
                }
            })
        }catch(err){
            throw new Error("Erro ao deletar pedido"); 
            console.log(err); 
        }
    }
}

export {DeleteOrderService}