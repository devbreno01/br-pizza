"use server"; 

import { apiClient } from "@/lib/api";

export async function registerAction(
    prevState: {success: boolean,  error: string} | null, 
    formData: FormData
){
    console.log("cclicouu caralhoooo")
    const email = formData.get("email"); 
    const name = formData.get("name"); 
    const password = formData.get("password"); 

    const data = {
        name: name, 
        email: email, 
        password:password
    }
    console.log("env",  process.env.API_URL)
    await apiClient("/user", {
        method: "POST", 
        body: JSON.stringify(data)
    })

    return {success:true, error: ""}; 
}