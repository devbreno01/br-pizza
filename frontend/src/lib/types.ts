
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

export interface Category{
    id: string,
    name: string,
    createdAt: string 
}



export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface Pagination {
    page: number;
    limit: number;
    totalPages: number;
}

export interface PaginatedOrders extends Pagination {
    listOrders: Order[];
}

export interface Product {
    id: string, 
    name: string,
    price: number,
    description: string,
    banner: string,
    category_id: string
    category?: {
        name: string
    }
}

export interface Order {
    id : string, 
    table: number
    draft: boolean, 
    status: boolean, 
    name?: string
    itens?: {
        id: string;
        amount: number;
        product: Pick<Product, "name" | "price" | "description" | "banner">;
    }[]
}