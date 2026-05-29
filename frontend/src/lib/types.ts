
export interface User {
    id: string;
    name: string;
    email: string; 
    role : "STAFF" | "ADMIN"; 
    createdAt: string
}

export interface UserInfo{
    user: User
}

export interface AuthResponse {
    autenticate?: Authenticate
}

interface Authenticate {
  id: string;
  email: string;
  password: string;
  role: string;
  token: string;
}