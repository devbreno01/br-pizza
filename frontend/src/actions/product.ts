"use server"

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";

export async function createAction(
    formData: FormData
){
    const token = await getToken();    
  
    try{
      
        const response = await apiClient("/products",{
            method: "POST", 
            token: token, 
            body: formData 
        });

        console.log(response);

        return { success :true, error:null}
    }catch(e){
        console.log('somenthing went wrong')
        if(e instanceof Error)
        {
            return {success: false , error: e.message}
        }
        return {success: false, error: "Erro ao criar produto"}
    }

}

export default async function deleteProductAction(product_id: string)
{
    console.log('ENtrou na function de excluir ')
    const token = await getToken();   
    try{
        const response = await apiClient(`/products/${product_id}`,{
            method: "DELETE", 
            token: token
        });
        console.log('chamou a api')
        console.log(response);
        
        return { success :true, error:null}
    }catch(e){  
        if(e instanceof Error){
            return {success: false , error: e.message}
        }
        console.log('e logo abaixo')
        console.log(e)
        return {success: false, error: "Erro ao deletar produto"}
    }
}