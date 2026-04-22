import prismaClient from "../../prisma"; 

interface ItemOrderProps{
    order_id: string, 
    product_id: string, 
    amount: number

} 
class AddItemOrderService{
    async execute({order_id, product_id,amount}: ItemOrderProps){
        try{
            const oderExists = await prismaClient.order.findFirst({
                where:{
                    id: order_id
                }
            }); 

            if(!oderExists){
                throw new Error("Ordem não encontrada"); 
            }

             const productExists = await prismaClient.product.findFirst({
                where:{
                    id: product_id, 
                    disabled: false 
                }
            }); 

            if(!productExists){
                throw new Error("Produto não encontrado"); 
            }


            const item = await prismaClient.item.create({
                data:{
                    order_id: order_id, 
                    product_id: product_id, 
                    amount: amount
                }, 
                select:
                {
                    id: true, 
                    amount: true, 
                    product_id: true, 
                    order_id: true, 
                    createdAt: true, 
                    product:{
                        select:{
                            id: true, 
                            name: true,
                            price: true, 
                            description: true, 
                            banner: true, 
                        }
                    }
                }
            }); 

            return item; 
        }catch(error){
            throw new Error("Falha ao adicionar item no pedido"); 
        }
    }
}

export {AddItemOrderService}