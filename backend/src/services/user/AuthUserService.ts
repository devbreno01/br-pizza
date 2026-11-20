import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthUserServiceProps{
    email: string, 
    password: string
}; 

class AuthUserService { 
    async execute({email, password}: AuthUserServiceProps){
        
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

        if (!user.id_pizza_place) {
            throw new Error("Usuário sem pizzaria vinculada");
        }

        const token = sign(
            { business_id: user.id_pizza_place },
            process.env.JWT_SECRET as string,
            { subject: user.id, expiresIn: "30d" }
        );

        return {
            id: user.id,
            name: user.name, 
            email: user.email, 
            role: user.role,
            business_id: user.id_pizza_place,
            token: token
        };
    }
}

export {AuthUserService}