import { cookies } from "next/headers";
import { User, UserInfo} from "@/lib/types"; 
import { apiClient } from "./api";
import { Redirect } from "next";
import { redirect } from "next/navigation";

const COOKIE_NAME = "token_users"; 

export async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value
}


export async function setToken(token: string){

   
    const cookie = await cookies();
    
    cookie.set(COOKIE_NAME, token, {
        httpOnly:true, 
        maxAge: 60 * 60 * 24 * 30, 
        path: "/", 
        sameSite: true, 
        secure: process.env.NODE_ENV === "production"
    });
}


export async function removeToken(){
    const cookie = await cookies();
    cookie.delete(COOKIE_NAME); 
}

export async function getUser(): Promise< UserInfo | null>{

    try{
        const token = await getToken();

        const user = await apiClient<UserInfo>("/me", {
            token: token
        }); 

        return user; 
    }catch(err){
        console.log(err);
        return null; 
    }
}

export async function getRequiredUser(): Promise<User | null> {
    const user  = await getUser(); 

    if(!user)
    {
         redirect("/register"); 
    }

    if(user.user.role !== "STAFF"){
        redirect("/access-denied"); 
    }
}