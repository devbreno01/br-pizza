import { z } from "zod";

export const CreateUserSchema = z.object({
    body: z.object({
        name: 
            z.string({message: "Precisa ser uma string"}).min(3,{message: "precisa ter no minimo 3 caracteres"}),
        
        email: z.email({message: "Precisa ser um e-mail válido"}),

        password: 
            z.string().min(6, {message: "A senha deve ter no minimo 6 caracteres"})
    })
});