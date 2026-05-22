"use server"; 

import { apiClient } from "@/lib/api";
import { User } from "@/lib/types";

export async function registerAction(
    prevState: {success: boolean,  error: string} | null, 
    formData: FormData
){
    
    const email = formData.get("email"); 
    const name = formData.get("name"); 
    const password = formData.get("password"); 

    const data = {
        name: name, 
        email: email, 
        password:password
    }
   
    await apiClient <User>("/user", {
        method: "POST", 
        body: JSON.stringify(data)
    })

    return {success:true, error: ""}; 
}