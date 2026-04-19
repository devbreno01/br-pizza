import prismaClient from "../../prisma"

class ListProductsByCategoryService{
    async execute(category_id: string){
         try{
            const products = prismaClient.product.findMany({
            
                where:{
                    category_id: category_id,
                    disabled: false
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
        }catch(error){
              throw new Error("Falha ao tentar fazer listagem de produtos");
        }
    }
}

export{ListProductsByCategoryService}