import prismaClient  from "../../prisma"

interface deleteProductProps {
    id: string
}

class DeleteProductService{
    async execute({id: id}: deleteProductProps){
        
        try{
           await prismaClient.product.delete({
                where:{id: id}
            })

            return {message: "Produto deletado com sucesso"}; 
        }catch(error){
            throw new Error("erro ao deletar produto")
        }
    }
}

export{DeleteProductService}