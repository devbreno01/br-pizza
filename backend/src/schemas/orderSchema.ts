import { z } from "zod";

export const CreateOrderSchema = z.object({
    body: z.object({
        table: 
            z.number({message: "Precisa enviar o numero da mesa"}), 
        
        draft: 
            z.boolean({message: "Precisa enviar o draft"}), 

        status: 
            z.boolean({message: "Precisa enviar o draft"})
        
    })
});

