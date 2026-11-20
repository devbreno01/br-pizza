import prismaClient from "../../prisma"; 

interface ItemOrderProps{
    business_id: string
    id: string

} 
class RemoveItemOrderService{
    async execute({id, business_id}: ItemOrderProps){
        
        try{
            const searchItem = await prismaClient.item.findFirst({
                where:{
                    id : id,
                    order: { business_id }
                }
            });

            if(!searchItem){
                throw new Error('Item não existe ou já foi deletado'); 
            }
            
            const deleteItem = await prismaClient.item.delete({
                where:{
                    id : id,
                    order: { business_id }
                }
            });

            return {"message": "Item deletado com sucesso"}; 
        }catch(error){
            throw new Error("Falha ao deletar item no pedido"); 
        }
    }
}

export {RemoveItemOrderService}    