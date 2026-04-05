import prismaClient from "../../prisma";
import {hash} from "bcryptjs"; 

interface createUserProps {
    name: string , 
    email: string, 
    password: string
}; 

class CreateUserService {
    async execute({name, email, password}: createUserProps){
        const findUser = await prismaClient.user.findFirst({
            where:{
                email: email 
            }
        })
        if(findUser){
            throw new Error("Usuário já existente"); 
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            }, 

            select:{
                name: true, 
                email: true, 
                role: true,
                createdAt: true
            }
        });

        return user; 
    }
}

export { CreateUserService }