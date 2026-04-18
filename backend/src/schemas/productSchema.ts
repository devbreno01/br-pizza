import { z } from "zod";

export const CreateCategorySchema = z.object({
    body: z.object({
        name: 
            z.string({message: "Precisa ser uma string"}).min(3,{message: "precisa ter no minimo 3 caracteres"}), 

        price: 
            z.number({message: "Precisa ser um numero"}), 
        
        description: 
            z.string({message: "Precisa ser uma string"}).min(3,{message: "precisa ter no minimo 3 caracteres"}), 


        category_id: 
             z.number({message: "Precisa ser um numero"})

    })
});

