import prismaClient from "../../prisma"

interface listCategoryProps{
    business_id: string,
    disabled: boolean | undefined,
    limit: number, 
    page: number
}

class ListProductService {
    

    async execute({business_id, disabled, limit, page}: listCategoryProps) {
        try{
            const offset =  (page -1 ) * limit; 
            const products = prismaClient.product.findMany({
            
                where:{
                    disabled,
                    business_id, category: { business_id }
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
                orderBy: [{ name: "asc" }, { id: "asc" }]
               
            });
        
            return products;             
        }catch(error){
              throw new Error("Falha ao tentar fazer listagem de produtos");
        }
    }

    async getCountOfProducts(business_id: string, disabled: boolean | undefined){
        const total = await prismaClient.product.count({
            where: { disabled, business_id, category: { business_id } }
        });
        return total; 
    }

}

export {ListProductService}