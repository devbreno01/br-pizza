import { z } from "zod";

export const CreateUserSchema = z.object({
    body: z.object({
        name: z.string("Informe seu nome").trim().min(3, "O nome deve ter pelo menos 3 caracteres"),
        email: z.email("Informe um e-mail válido"),
        password: z.string("Informe sua senha").min(6, "A senha deve ter pelo menos 6 caracteres"),
        business: z.object({
            name: z.string("Informe o nome da pizzaria").trim().min(3, "O nome da pizzaria deve ter pelo menos 3 caracteres"),
            cnpj: z.string("Informe o CNPJ da pizzaria").trim()
                .transform(value => value.replace(/[.\/\-\s]/g, "").toUpperCase())
                .pipe(z.string().regex(/^[A-Z0-9]{12}\d{2}$/, "Informe um CNPJ válido")),
            description: z.string("Informe a descrição da pizzaria").trim().min(1, "Informe a descrição da pizzaria")
        }, "Informe os dados da pizzaria")
    })
});

export const AuthUserSchema = z.object({
    body: z.object({
        email: z.email("Precisa ser um e-mail válido"),
        password: z.string("A senha é obrigatória")
    })
});
