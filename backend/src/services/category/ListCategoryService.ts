import prismaClient from "../../prisma"; 


class ListCategoryService{
    async execute(){
        try{
            const categories = prismaClient.user.findMany({
                select:{
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