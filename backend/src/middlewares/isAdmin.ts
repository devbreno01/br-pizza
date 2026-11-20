import { Request, Response, NextFunction } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.user_role !== "ADMIN") {
        return res.status(401).json({ error: "Usuário sem permissão" });
    }

    return next();
}
