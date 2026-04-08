import prismaClient from "../../prisma";

interface createCategoryProps{
    name: string
}; 

class CreateCategoryService{
    async execute({name}: createCategoryProps){
        const findCategory = await prismaClient.category.findFirst({
            where:{
                name: name
            }
        }); 

        if(!findCategory)
            throw new Error('Categoria já cadastrada'); 

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