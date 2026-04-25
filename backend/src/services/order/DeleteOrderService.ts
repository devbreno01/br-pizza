import prismaClient from "../../prisma";

interface deleteOrderProps{
    id: string
}

class DeleteOrderService {
    async execute ({id}: deleteOrderProps){
        try{
            const oderExists = await prismaClient.order.findFirst({
                where:{
                    id: id
                }
            }); 

            if(!oderExists){
                throw new Error("Ordem não encontrada"); 
            }
            
            const deleteOrder = await prismaClient.order.delete({
                where: {
                    id: id
                }
            })
        }catch(err){
            throw new Error("Erro ao deletar pedido"); 
            console.log(err); 
        }
    }
}

export {DeleteOrderService}