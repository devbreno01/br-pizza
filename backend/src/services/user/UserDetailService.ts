import prismaClient from "../../prisma";
class UserDetailService{
    async execute(userId: string){

        try{
            const user = await prismaClient.user.findFirst({
            where:{
                id: userId
            },
            select:{
                id: true, 
                name:true, 
                email: true, 
                role: true,
                createdAt: true
                }
            });        

            return user; 
        }catch(err){
            throw new Error("Erro ao encontrar usuário")
        }
         
    }
}

export {UserDetailService}; 