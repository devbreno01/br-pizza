import { hash } from "bcryptjs";
import type { z } from "zod";
import { Prisma } from "../../generated/prisma/client";
import prismaClient from "../../prisma";
import type { CreateUserSchema } from "../../schemas/userSchema";

type Registration = z.output<typeof CreateUserSchema>["body"];

class CreateUserService {
    async execute({ name, email, password, business }: Registration) {
        const passwordHash = await hash(password, 8);

        try {
            return await prismaClient.$transaction(async transaction => {
                const pizzaPlace = await transaction.business.create({ data: business });

                return transaction.user.create({
                    data: {
                        name,
                        email,
                        password: passwordHash,
                        role: "ADMIN",
                        id_pizza_place: pizzaPlace.id
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        createdAt: true,
                        id_pizza_place: true
                    }
                });
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
                throw new Error("E-mail ou CNPJ já cadastrado");
            }
            throw error;
        }
    }
}

export { CreateUserService };
