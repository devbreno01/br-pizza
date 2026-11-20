"use client";

import { useActionState, useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerAction } from "@/actions/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const fieldClass = "text-white bg-app-card border border-app-border";

export function RegisterForm() {
    const router = useRouter();
    const [step, setStep] = useState<"account" | "business">("account");
    const [account, setAccount] = useState({ name: "", email: "", password: "" });
    const [business, setBusiness] = useState({ name: "", cnpj: "", description: "" });
    const [state, formAction, isPending] = useActionState(registerAction, null);

    useEffect(() => {
        if (state?.success && state.redirectTo) router.push(state.redirectTo);
    }, [router, state]);

    function advance(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setStep("business");
    }

    return (
        <Card className="bg-app-card border-app-border w-full max-w-md mx-auto text-white">
            <CardHeader>
                <CardTitle className="text-center text-3xl sm:text-4xl font-bold">
                    Br<span className="text-brand-primary">Pizza</span>
                </CardTitle>
                <CardDescription className="text-center text-gray-300">
                    {step === "account" ? "Etapa 1 de 2 · Sua conta" : "Etapa 2 de 2 · Sua pizzaria"}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {step === "account" ? (
                    <form onSubmit={advance} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" autoComplete="name" required minLength={3}
                                value={account.name} className={fieldClass}
                                onChange={event => setAccount({ ...account, name: event.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" type="email" autoComplete="email" required
                                value={account.email} className={fieldClass}
                                onChange={event => setAccount({ ...account, email: event.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" autoComplete="new-password" required minLength={6}
                                value={account.password} className={fieldClass}
                                onChange={event => setAccount({ ...account, password: event.target.value })} />
                        </div>
                        <Button type="submit" className="w-full bg-brand-primary text-white hover:bg-brand-primary">
                            Continuar
                        </Button>
                    </form>
                ) : (
                    <form action={formData => {
                        formData.set("name", account.name);
                        formData.set("email", account.email);
                        formData.set("password", account.password);
                        formData.set("businessName", business.name);
                        formData.set("cnpj", business.cnpj);
                        formData.set("businessDescription", business.description);
                        formAction(formData);
                    }} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="businessName">Nome da pizzaria</Label>
                            <Input id="businessName" name="businessName" autoComplete="organization" required minLength={3}
                                value={business.name} className={fieldClass}
                                onChange={event => setBusiness({ ...business, name: event.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cnpj">CNPJ</Label>
                            <Input id="cnpj" name="cnpj" required aria-describedby="cnpj-help"
                                value={business.cnpj} className={fieldClass}
                                onChange={event => setBusiness({ ...business, cnpj: event.target.value })} />
                            <p id="cnpj-help" className="text-sm text-gray-300">
                                Informe os 14 caracteres do CNPJ. A pontuação é opcional.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="businessDescription">Descrição</Label>
                            <Textarea id="businessDescription" name="businessDescription" required
                                value={business.description} className={fieldClass}
                                onChange={event => setBusiness({ ...business, description: event.target.value })} />
                        </div>
                        {state?.error && <p role="alert" className="text-sm text-red-300">{state.error}</p>}
                        <div className="flex gap-2">
                            <Button type="button" variant="outline" disabled={isPending}
                                onClick={() => setStep("account")}>
                                Voltar
                            </Button>
                            <Button type="submit" disabled={isPending}
                                className="flex-1 bg-brand-primary text-white hover:bg-brand-primary">
                                {isPending ? "Criando conta..." : "Criar conta e pizzaria"}
                            </Button>
                        </div>
                    </form>
                )}

                <p className="text-center text-sm text-gray-100">
                    Já tem uma conta? <Link href="/login" className="text-brand-primary font-semibold">Faça login</Link>
                </p>
            </CardContent>
        </Card>
    );
}
