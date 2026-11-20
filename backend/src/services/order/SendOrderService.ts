import prismaClient from "../../prisma"; 

interface SendOrderProps {
    name: string , 
    user_id: string
    order_id: string
}

class SendOrderService {
    async execute({name, order_id, user_id} :SendOrderProps ){
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

            // Setting draft false, so send to kitchen 
            const sendKitchen = await prismaClient.order.update({
                where:{
                    id: order_id,
                    user_id
                }, 
                data:{
                    draft : false, 
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

            return sendKitchen; 
            


        }catch(err){
            console.log(err); 
            throw new Error("Falha ao enviar  o pedido para cozinha"); 
        }
    }
}


export {SendOrderService}