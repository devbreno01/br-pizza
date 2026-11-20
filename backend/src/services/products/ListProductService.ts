import prismaClient from "../../prisma"

interface listCategoryProps{
    user_id: string,
    disabled: boolean | undefined,
    limit: number, 
    page: number
}

class ListProductService {
    

    async execute({user_id, disabled, limit, page}: listCategoryProps) {
        try{
            const offset =  (page -1 ) * limit; 
            const products = prismaClient.product.findMany({
            
                where:{
                    disabled,
                    category: { user_id }
                },

                select:{
                    id:true,
                    name: true, 
                    price: true, 
                    description: true, 
                    banner: true,
                    category_id: true,
                    
                    category:{
                        select:{
                            name: true
                        }
                    }
                },  
                
                skip: offset, 
                take: limit, 
                orderBy: {
                    name: "asc"
                }
               
            });
        
            return products;             
        }catch(error){
              throw new Error("Falha ao tentar fazer listagem de produtos");
        }
    }

    async getCountOfProducts(user_id: string, disabled: boolean | undefined){
        const total = await prismaClient.product.count({
            where: { disabled, category: { user_id } }
        });
        return total; 
    }

}

export {ListProductService}