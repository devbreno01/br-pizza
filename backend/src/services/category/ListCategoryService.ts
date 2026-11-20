import prismaClient from "../../prisma"; 


class ListCategoryService{
    async execute(user_id: string){
        try{
            const categories = prismaClient.category.findMany({
                where: { user_id },
                select:{
                    id: true, 
                    name: true, 
                    createdAt: true
                }
              
            })

            return categories; 
        }catch(error){
            throw new Error("Erro ao listar categorias"); 
        }
    }
}

export {ListCategoryService}