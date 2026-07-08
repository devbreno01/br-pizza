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
        })
    }catch(err){
        if(err instanceof Error)
        {
            return {sucesss: true, error: err.message}
        }

        return {sucesss: false, error: "Erro ao criar categoria"}
    }
}