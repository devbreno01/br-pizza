import prismaClient from "../../prisma"

interface listCategoryProps{
    disabled: boolean | undefined
}

class ListProductService {
    

    async execute({disabled}: listCategoryProps) {
        const products = prismaClient.product.findMany({
            
            where:{
                disabled: disabled
            },

            select:{
                name: true, 
                price: true, 
                description: true, 
                banner: true,
                category_id: true
            }
        });
        
        return products; 
    }
}

export {ListProductService}