import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../prisma";

export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const [scheme, token, extra] = req.headers.authorization?.split(" ") ?? [];
    if (scheme?.toLowerCase() !== "bearer" || !token || extra !== undefined) {
        return res.status(401).json({ error: "Token Bearer ausente ou mal formatado" });
    }

    let payload;
    try {
        payload = verify(token, process.env.JWT_SECRET as string);
    } catch {
        return res.status(401).json({ error: "Token inválido" });
    }

    if (typeof payload === "string" || typeof payload.sub !== "string" || !payload.sub ||
        typeof payload.business_id !== "string" || !payload.business_id) {
        return res.status(401).json({ error: "Token inválido" });
    }

    const user = await prismaClient.user.findUnique({
        where: { id: payload.sub, id_pizza_place: payload.business_id },
        select: { role: true }
    });
    if (!user) {
        return res.status(401).json({ error: "Usuário sem vínculo com a pizzaria" });
    }

    req.user_id = payload.sub;
    req.business_id = payload.business_id;
    req.user_role = user.role;
    return next();
}
