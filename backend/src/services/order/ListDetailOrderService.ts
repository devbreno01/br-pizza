import prismaClient  from "../../prisma"; 

class ListDetailOrderService{
     async execute(user_id: string, draft?: boolean){

        
        try{
            const listOrders = await prismaClient.order.findMany({
                where:{
                    user_id,
                    ...(draft !== undefined && { draft })
                }, 
                select:{
                    id:true, 
                    table: true, 
                    status: true, 
                    draft: true, 
                    name: true,
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
            })

            return listOrders; 
        }catch(error){
            throw new Error("Erro ao exibir listagem")
        }
    }
}

export {ListDetailOrderService}