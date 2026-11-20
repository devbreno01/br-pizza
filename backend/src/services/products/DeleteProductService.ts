import prismaClient  from "../../prisma"

interface deleteProductProps {
    id: string
    business_id: string
}

class DeleteProductService{
    async execute({id, business_id}: deleteProductProps){
        
        try{
           await prismaClient.product.delete({
                where: { id, business_id, category: { business_id } }
            })

            return {message: "Produto deletado com sucesso"}; 
        }catch(error){
            throw new Error("erro ao deletar produto")
        }
    }
}

export{DeleteProductService}