import prismaClient from "../../prisma"; 

interface ItemOrderProps{
    id: string

} 
class RemoveItemOrderService{
    async execute({id}: ItemOrderProps){
        console.log('Entrou metodo remove service ');
        try{
            const searchItem = await prismaClient.item.findFirst({
                where:{
                    id : id
                }
            });

            if(!searchItem){
                throw new Error('Item não existe ou já foi deletado'); 
            }
            console.log('Antes do delete'); 
            const deleteItem = await prismaClient.item.delete({
                where:{
                    id : id
                }
            });

            return {"message": "Item deletado com sucesso"}; 
        }catch(error){
            throw new Error("Falha ao deletar item no pedido"); 
        }
    }
}

export {RemoveItemOrderService}    