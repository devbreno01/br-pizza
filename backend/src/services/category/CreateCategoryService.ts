import prismaClient from "../../prisma";

interface createCategoryProps{
    name: string
    business_id: string

}; 

class CreateCategoryService{
    async execute({name, business_id}: createCategoryProps){
       
        try{
            const category = prismaClient.category.create({
                data:{
                    name: name,
                    business_id
                }, 

                select:{
                    name: true, 
                    createdAt: true
                }
            });

            return category; 
        }catch(error){
            throw new Error("Erro ao cadastrar categoria");
        }        

    }
}

export {CreateCategoryService}