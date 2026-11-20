declare namespace Express {
    export interface Request {
        user_id: string;
        business_id: string;
        user_role: "ADMIN" | "STAFF";
    }
}
