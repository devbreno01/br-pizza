import prismaClient  from "../../prisma"

interface deleteProductProps {
    id: string
}

class DeleteProductService{
    async execute({id: id}: deleteProductProps){
        
        try{
            const deleteProduct = await prismaClient.product.delete({
                where:{id: id}
            })

            return deleteProduct; 
        }catch(error){
            throw new Error("erro ao deletar produto")
        }
    }
}

export{DeleteProductService}