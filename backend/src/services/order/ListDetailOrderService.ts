import prismaClient  from "../../prisma"; 

class ListDetailOrderService{
     async execute(draft?: boolean){

        
        try{
            const listOrders = await prismaClient.order.findMany({
                where:{
                    ...(draft !== undefined && { draft })
                }, 
                select:{
                    id:true, 
                    table: true, 
                    status: true, 
                    draft: true, 
                    name: true,
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
            })

            return listOrders; 
        }catch(error){
            throw new Error("Erro ao exibir listagem")
        }
    }
}

export {ListDetailOrderService}