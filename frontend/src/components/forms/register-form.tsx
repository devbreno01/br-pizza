"use client"; 

import { useActionState } from "react";
import {Card , 
        CardHeader, 
        CardDescription, 
        CardContent, 
        CardFooter , 
        CardTitle} from "@/components/ui/card"; 

import { Label } from "@/components/ui/label"; 
import { Input } from "@/components/ui/input"; 
import {Button} from "@/components/ui/button";
import Link from "next/link"; 

import {registerAction} from "@/actions/auth"; 
 
export function RegisterForm(){
    const [state, formAction, isPending] = useActionState(registerAction,null )
    return (
        <Card className="bg-app-card border-app-border w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-white text-center text-3xl sm:text-4xl font-bold">Br<span className="text-brand-primary">Pizza</span></CardTitle>
            </CardHeader>

            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Nome</Label>
                        <Input type="text"
                        name="name"
                        id="name" 
                        placeholder="Digite seu nome"
                        required
                        className="text-white bg-app-card border border-app-border">
                        </Input>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="email" className="text-white">E-mail</Label>
                        <Input type="email"
                        id="email" 
                        name="email"
                        placeholder="Digite seu e-mail"
                        required
                        className="text-white bg-app-card border border-app-border">
                        
                        </Input>
                    </div>

                    <div className="space-y-2 ">
                        
                        <Label htmlFor="password" className="text-white">Senha</Label>
                        <Input type="password"
                        id="password" 
                        name="password"
                        placeholder="Digite sua senha"
                        required
                        className="text-white bg-app-card border border-app-border"></Input>
                    </div>
                   <Button type="submit" 
                   className="w-full bg-brand-primary text-white hover:bg-brand-primary">
                    {isPending ? 'Criando Conta' : 'Criar Conta'}
                   </Button>

                   <p className="text-center text-sm text-gray-100">
                        Já tem uma conta? <Link href="/login" className="text-brand-primary text-semibold">Faça Login</Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}