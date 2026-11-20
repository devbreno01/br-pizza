import prismaClient  from "../../prisma"

interface deleteProductProps {
    id: string
    user_id: string
}

class DeleteProductService{
    async execute({id, user_id}: deleteProductProps){
        
        try{
           await prismaClient.product.delete({
                where: { id, category: { user_id } }
            })

            return {message: "Produto deletado com sucesso"}; 
        }catch(error){
            throw new Error("erro ao deletar produto")
        }
    }
}

export{DeleteProductService}