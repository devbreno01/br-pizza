import prismaClient  from "../../prisma"; 

class ListDetailOrderService{
     async execute(draft?: boolean){

        
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

export {ListDetailOrderService}