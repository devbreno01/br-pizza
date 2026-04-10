import prismaClient from "../../prisma";

interface CreateProductServiceProps{
    name: string, 
    price: number, 
    description: string, 
    banner: string, 
    disabled: boolean, 
    category_id: string 
}


class CreateProductService {
    async execute({name ,price,description ,banner ,disabled ,category_id}: CreateProductServiceProps){

        const verifyCategory = prismaClient.category.findFirst({
            where:{
                id: category_id
            }
        }); 

        if(!verifyCategory){
            throw new Error("Categoria não existente"); 
        }
        
        try{
            const product = prismaClient.product.create({
                data:{
                    name: name, 
                    price: price, 
                    description: description, 
                    banner: banner, 
                    disabled: disabled, 
                    category_id: category_id
                }, 
                
                select:{
                    name: true, 
                    price: true, 
                    description: true, 
                    banner: true, 
                    disabled: true, 
                    category_id: true

                }
            }); 
        }catch(error){
            throw new Error("Erro ao tentar cadastrar produto. Tente novamente!"); 
        }
    }


}

export {CreateProductService}