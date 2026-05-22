
export interface User {
    id: string;
    name: string;
    email: string; 
    role : "STAFF" | "ADMIN"; 
    createdAt: string
}

export interface AuthResponse {
    id: string, 
    email: string, 
    password: string, 
    role: string 
}