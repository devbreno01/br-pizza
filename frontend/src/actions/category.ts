"use server"

import { apiClient } from "@/lib/api"
import { AuthResponse } from "@/lib/types"
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth"
import { Category } from "@/lib/types"

export async function createAction(
    prevState: {success: boolean, error: string | null }, 
    formData: FormData
)
{
    const token = await getToken(); 
    const name = formData.get("name"); 

    const payload = {
        name: name
    }

    try{
        await apiClient("/category", {
            method: "POST", 
            token: token, 
            body:JSON.stringify(payload)
        });
        console.log('deu certo'); 
        return { success :true, error:null}
    }catch(err){
        if(err instanceof Error)
        {
            console.log(err.message)
            return {success: true, error: err.message}
        }

        return {success: false, error: "Erro ao criar categoria"}
    }
}