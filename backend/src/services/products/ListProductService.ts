import prismaClient from "../../prisma"

interface listCategoryProps{
    disabled: boolean | undefined
}

class ListProductService {
    

    async execute({disabled}: listCategoryProps) {
        try{
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
            });
        
            return products;             
        }catch(error){
              throw new Error("Falha ao tentar fazer listagem de produtos");
        }
    }
}

export {ListProductService}