import {Card , 
        CardHeader, 
        CardDescription, 
        CardContent, 
        CardFooter , 
        CardTitle} from "@/components/ui/card"; 

import { Label } from "@/components/ui/label"; 
import { Input } from "@/components/ui/input"; 
import {Button} from "@/components/ui/button";
 
export function RegisterForm(){
    return (
        <Card className="bg-app-card border-app-border w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-white text-center text-3xl sm:text-4xl font-bold">Br<span className="text-brand-primary">Pizza</span></CardTitle>
            </CardHeader>

            <CardContent>
                <form action="" className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Nome</Label>
                        <Input type="text"
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
                        placeholder="Digite seu e-mail"
                        required
                        className="text-white bg-app-card border border-app-border">
                        
                        </Input>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="password" className="text-white">Password</Label>
                        <Input type="password"
                        id="password" 
                        placeholder="Digite sua senha"
                        required
                        className="text-white bg-app-card border border-app-border"></Input>
                    </div>
                   <Button type="submit" 
                   className="w-full bg-brand-primary text-white hover:bg-brand-primary">Criar Conta</Button>
                </form>
            </CardContent>
        </Card>
    );
}