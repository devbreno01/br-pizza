"use client"

import { useActionState, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"; 
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { createAction } from "@/actions/category"
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

export  async function CategoryForm()
{
    const [open, setOpen] = useState(false); 
    const [state, formAction, isPending] = useActionState(createAction, null);
    const router = useRouter(); 

     useEffect(() => {
        if (state?.success && state?.redirectTo) {
            router.push(state.redirectTo)
        }
    // }, [state]); 
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex flex-row rounded align-center justify-center bg-brand-primary p-2 font-semibold hover:text-white! hover:bg-brand-primary ">
            <Plus className="w-5 h-5 mr-2"/> 
            Nova Categoria
        </DialogTrigger>

        <DialogContent className="p-4 sm:p-6 bg-app-card text-white">
            <DialogHeader>
                <DialogTitle> Criar nova categoria</DialogTitle>
            </DialogHeader>

            <form className="space-y-4" action={formAction}>
                <div>
                    <Label htmlFor="name" className="mb-2">Nome</Label>
                    <Input type="text" name="name" id="name" placeholder="Digite o nome da categoria" 
                    className="border-app-border bg-app-background text-white"/>
                </div>

                <Button
                    type="submit"
                    variant="ghost"
                    className="w-full bg-brand-primary text-white hover:bg-brand-primary ">
                    Criar
                </Button>
            </form>
        </DialogContent>
      </Dialog>
    )
}