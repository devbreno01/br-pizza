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



export const AddItemSchema  = z.object({
    body: z.object({
        amount: 
            z.number({message: "Precisa enviar a quantidade"}), 
        
        order_id: 
            z.string({message: "Selecione o pedido"}), 

        product_id: 
            z.string({message: "Selecione o produto "})
        
    })
});