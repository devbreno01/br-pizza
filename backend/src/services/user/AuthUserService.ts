import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthUserServiceProps{
    email: string, 
    password: string
}; 

class AuthUserService { 
    async execute({email, password}: AuthUserServiceProps){
        console.log(email, password);
        
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        });

        if(!user){
            throw new Error("Email/senha obrigatório");
        }

        const passowrdMatch = await compare(password, user.password);

        if(!passowrdMatch){
            throw new Error("Email/senha obrigatório");
        }

        const token = sign({
            name: user.name, password: user.password}, 
            process.env.JWT_SECRET as string,
            {subject: user.id ,
             expiresIn: "30d"   
        });


        return {
            id: user.id,
            name: user.name, 
            email: user.email, 
            role: user.role, 
            token: token
        };
    }
}

export {AuthUserService}