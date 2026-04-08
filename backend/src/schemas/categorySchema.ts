import { z } from "zod";

export const CreateCategorySchema = z.object({
    body: z.object({
        name: 
            z.string({message: "Precisa ser uma string"}).min(3,{message: "precisa ter no minimo 3 caracteres"})
    })
});

