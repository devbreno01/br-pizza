import prismaClient from "../../prisma";

interface createCategoryProps{
    name: string

}; 

class CreateCategoryService{
    async execute({name}: createCategoryProps){
       
        try{
            const category = prismaClient.category.create({
                data:{
                    name: name 
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