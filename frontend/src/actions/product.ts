"use server"

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";

export async function createAction(
    prevState: {success: boolean, error: string | null }, 
    formData: FormData
){
    const token = await getToken(); 

    /*
    
    */
   const name = formData.get("name"); 
   const description = formData.get("description"); 
   const price = formData.get("price");
   const category_id = formData.get("category_id"); 
   const file = formData.get("file"); 
   const payload : FormData = {
       name: name, 
       description: description, 
       price: price, 
       category_id: category_id, 
       file: file 
   }
   
    console.log('formData', formData);
    try{
        console.log('create product action')
        await apiClient("/products",{
            method: "POST", 
            token: token, 
            body: payload 
        });

        return { success :true, error:null}
    }catch(e){
        console.log('somenthing went wrong')
        if(e instanceof Error)
        {
            return {success: false , error: e.message}
        }

        console.log(e); 
        return {success: false, error: "Erro ao criar produto"}
    }

    

}