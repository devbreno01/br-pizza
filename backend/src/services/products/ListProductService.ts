import prismaClient from "../../prisma"

interface listCategoryProps{
    disabled: boolean | undefined,
    limit: number, 
    page: number
}

class ListProductService {
    

    async execute({disabled, limit, page}: listCategoryProps) {
        try{
            const offset =  (page -1 ) * limit; 
            const products = prismaClient.product.findMany({
            
                where:{
                    disabled: disabled
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
                take: limit
               
            });
        
            return products;             
        }catch(error){
              throw new Error("Falha ao tentar fazer listagem de produtos");
        }
    }

    async getCountOfProducts(){
        const total = prismaClient.product.count(); 
        return total; 
    }

}

export {ListProductService}