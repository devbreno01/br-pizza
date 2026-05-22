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
   
   try{
        await apiClient <User>("/user", {
            method: "POST", 
            body: JSON.stringify(data)
        }); 
        return {success:true, error: "", redirectTo: "/login"};
   }catch(e){
    if(e instanceof Error){
        return {success:false, error: e.message}; 
    }
     return {success:false, error: "Erro ao criar conta"}; 
   }

   
}



export async function loginAction(
    prevState: {success: boolean,  error: string} | null, 
    formData: FormData
){
    
    const email = formData.get("email"); 
    const password = formData.get("password"); 

    const data = {
        email: email, 
        password:password
    }
   
   try{
        await apiClient <User>("/session", {
            method: "POST", 
            body: JSON.stringify(data) 
        }); 
        return {success:true, error: "", redirectTo: "/"};
   }catch(e){
    if(e instanceof Error){
        return {success:false, error: e.message}; 
    }
     return {success:false, error: "Erro ao tentativa de login"}; 
   }

   
}