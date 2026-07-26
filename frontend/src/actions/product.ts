"use server"

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";

export async function createAction(
    prevState: {success: boolean, error: string | null }, 
    formData: FormData
){
    const token = await getToken(); 

    /*
    const name = formData.get("name"); 
    const description = formData.get("description"); 
    const price = formData.get("price");
    const category_id = formData.get("category_id"); 
    const file = formData.get("file"); 
  
    const payload = {
        name: name, 
        description: description, 
        price: price, 
        category_id: category_id, 
        file: file 
    }
    */
    try{
        await apiClient("/products",{
            method: "POST", 
            token: token, 
            body: formData 
        });

        return { success :true, error:null}
    }catch(e){
        if(e instanceof Error)
        {
            return {success: false , error: e.message}
        }
        return {success: false, error: "Erro ao criar produto"}
    }

    

}