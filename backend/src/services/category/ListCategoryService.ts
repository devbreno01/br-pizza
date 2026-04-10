import prismaClient from "../../prisma"; 


class ListCategoryService{
    async execute(){
        try{
            const categories = prismaClient.category.findMany({
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