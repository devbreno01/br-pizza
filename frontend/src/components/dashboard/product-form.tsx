"use client"

import { useState, useActionState } from "react";
import { Button } from "@/components/ui/button"; 
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const initialState = {
  success: false,
  error: null,
}

export default function ProductForm(){
    const [open, setOpen]  = useState(false); 

    // const [state, formAction, isPeding] = useActionState()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex flex-row rounded align-center justify-center bg-brand-primary p-2 font-semibold hover:text-white! hover:bg-brand-primary ">
            <Plus className="w-5 h-5 mr-2"/> 
            Novo Produto
        </DialogTrigger>

        <DialogContent className=" sm:p-6 bg-app-card text-white">
            <DialogHeader>
                <DialogTitle> Criar nova categoria</DialogTitle>
            </DialogHeader>

            <form className="space-y-6">
                <div className="flex flex-row gap-2 p-2">
                    <div>
                        <Label htmlFor="name" className="mb-2">Nome do Produto</Label>
                        <Input type="text" name="name" id="name" placeholder="Digite o nome do produto" 
                        className="border-app-border bg-app-background text-white"/>
                    </div>
                    <div>
                        <Label htmlFor="name" className="mb-2">Preço</Label>
                        <Input type="text" name="name" id="name" placeholder="Digite o preço do produto" 
                        className="border-app-border bg-app-background text-white"/>
                    </div>
                   

                </div>

                <div>
                    <Label htmlFor="name" className="mb-2">Categoria</Label>
                    <Input type="text" name="name" id="name" placeholder="selecione categoria" 
                        className="border-app-border bg-app-background text-white"/>
                </div>


                <div>
                    <Label htmlFor="name" className="mb-2">Descrição</Label>
                    <Textarea  name="description" maxLength={50} placeholder="Escreva uma descrição"  className="border-app-border bg-app-background text-white"/>
                </div>


                <div>
                    <Label htmlFor="image" className="mb-2">Imagem</Label>
                    <Input type="file" name="image" id="image"
                        className="border-app-border  bg-app-background text-white rounded-[10px] h-20"/>
                </div>



                <Button
                    type="submit"
                    variant="ghost"
                    className="w-full bg-brand-primary text-white hover:bg-brand-primary ">
                    {/* { isPeding ? 'Salvando' : 'Criar'} */}
                    Criar
                </Button>

                {/*state?.error &&  <p className="text-red-500"> {state.error} </p>*/}
            </form>
        </DialogContent>
      </Dialog>
    )
}