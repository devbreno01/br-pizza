import prismaClient  from "../../prisma"

interface deleteProductProps {
    id: string
}

class DeleteProductService{
    async execute({id: id}: deleteProductProps){
        
        try{
            const deleteProduct = await prismaClient.product.update({
                data:{
                    disabled: true
                },
                where:{id: id},
                select:{
                    disabled:true
                }
            })

            return {message: "Produto deletado com sucesso"}; 
        }catch(error){
            throw new Error("erro ao deletar produto")
        }
    }
}

export{DeleteProductService}