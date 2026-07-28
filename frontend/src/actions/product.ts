"use server"

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";

export async function createAction(
    formData: FormData
){
    const token = await getToken();    
    console.log('bateu aqui'); 
    try{
        console.log('create product action')
        await apiClient("/products",{
            method: "POST", 
            token: token, 
            body: formData 
        });

        return { success :true, error:null}
    }catch(e){
        console.log('somenthing went wrong')
        if(e instanceof Error)
        {
            return {success: false , error: e.message}
        }

        console.log(e.message);

        return {success: false, error: "Erro ao criar produto"}
    }

    

}