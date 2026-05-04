import {Card , 
        CardHeader, 
        CardDescription, 
        CardContent, 
        CardFooter , 
        CardTitle} from "@/components/ui/card"; 

import { Label } from "@/components/ui/label"; 
import { Input } from "@/components/ui/input"; 

 
export function RegisterForm(){
    return (
        <Card>
            <CardHeader>
                <CardTitle>Br<span className="text-brand-primary">Pizza</span></CardTitle>
            </CardHeader>

            <CardContent>
                <form action="">
                    <div>
                        <Label htmlFor="name">Nome</Label>
                        <Input type="text"
                        id="name" 
                        placeholder="Digite seu nome"
                        required
                        className="text-white bg-app-card border border-app-border">
                        </Input>
                    </div>
                    <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input type="email"
                        id="email" 
                        placeholder="Digite seu e-mail"
                        required></Input>
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password"
                        id="password" 
                        placeholder="Digite sua senha"
                        required></Input>
                    </div>
                   
                </form>
            </CardContent>
        </Card>
    );
}