

const API_URL = process.env.NEXT_PUBLIC_API_URL; 

export function getApiUrl()  {
    return API_URL; 
}

interface FetchOptions extends RequestInit{
    token?: string, 
    cache?:  "force-cache" | "no-store"; 
    next?: {
        revalidate?: false | 0 | number, 
        tags?: string[]
    }
}

export async function apiClient <T> (
    endpoint: string, 
    options: FetchOptions ={}
): Promise<T>{
    
    
    const {token, ...fetchOptions} = options; 

    //Record is an object where both keys and values are strings
    const headers: Record<string,string> = {
        ...(fetchOptions.headers as Record<string, string>) 
    }
    
    
    if(token){
        headers["Authorization"] = `Bearer ${token}` 
    }

    if(!(fetchOptions.body instanceof FormData)){
        headers["Content-Type"] = "application/json";
    }
    const response = await fetch(`${API_URL}${endpoint}`,{
        ...fetchOptions, 
        headers
    }); 

    if(!response.ok){
        const error = await response.json().catch(()=>({
            error: "Erro HTTP: " + response.status  
        }))

        const messages = Array.isArray(error?.details)
            ? error.details.flatMap((detail: { message?: unknown } | null) =>
                typeof detail?.message === "string" ? [detail.message] : [])
            : [];

        throw new Error(messages.join(" ") || error?.error || "Erro na requisição");
    }

    return response.json(); 
}
