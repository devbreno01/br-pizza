"use server"

import { apiClient } from "@/lib/api"
import { ApiResponse, Category, Pagination } from "@/lib/types"
import { getToken } from "@/lib/auth"

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

export async function getCategories(): Promise<Category[]> {
    const token = await getToken();
    const categories: Category[] = [];
    let page = 1;
    let totalPages: number;

    do {
        const response = await apiClient<ApiResponse<Category[]> & Pagination>(
            `/categories?page=${page}&limit=100`,
            { token }
        );
        categories.push(...response.data);
        totalPages = response.totalPages;
        page++;
    } while (page <= totalPages);

    return categories;
}
