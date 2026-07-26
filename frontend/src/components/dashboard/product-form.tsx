"use client"

import { useState, useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button"; 
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Field , FieldLabel, FieldDescription} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 

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
import { apiClient } from "@/lib/api";
import { ApiResponse, Category } from "@/lib/types";
import { getToken } from "@/lib/auth";
import { getCategories } from "@/actions/category";

const initialState = {
  success: false,
  error: null,
}

export default function ProductForm(){
    const [open, setOpen]  = useState(false); 
    const [categories, setCategories] = useState([]); 
    const [categoryId, setCategoryId] = useState(""); 
    const [price, setPrice] = useState('');

    const handlePriceChange = (e) => {
        const inputValue = e.target.value;

        // Allows only numbers and up to 2 decimal places
        const regex = /^\d*\.?\d{0,2}$/;

        if (regex.test(inputValue) || inputValue === '') {
        
            setPrice(inputValue);
        }
    };

    const handlePriceBlur = () => {
        // Automatically formats to 2 decimal places when clicking away
        if (price && !isNaN(price)) {
            setPrice(parseFloat(price).toFixed(2));
        }
    };

    useEffect(() => {
        getCategories().then((data) => {
            setCategories(data);
        });
    }, []);

    const items = categories.map(category => ({
        value: category.id,
        label: category.name,
    }));
    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex flex-row rounded align-center justify-center bg-brand-primary p-2 font-semibold hover:text-white! hover:bg-brand-primary ">
            <Plus className="w-5 h-5 mr-2"/> 
            Novo Produto
        </DialogTrigger>

        <DialogContent className=" sm:p-6 bg-app-card text-white">
            <DialogHeader>
                <DialogTitle>Novo Produto</DialogTitle>
            </DialogHeader>

            <form className="space-y-6">
                <div className="flex flex-row gap-2 p-2">
                    <div>
                        <Label htmlFor="name" className="mb-2">Nome do Produto</Label>
                        <Input type="text" name="name" id="name" placeholder="Digite o nome do produto" 
                        className="border-app-border bg-app-background text-white"/>
                    </div>
                    <div>
                        <Label htmlFor="price" className="mb-2">Preço</Label>
                        <Input 
                            type="text" 
                            name="price" 
                            id="price" 
                            placeholder="0.00" 
                            value={price} 
                            onChange={handlePriceChange}  
                            onBlur={handlePriceBlur}
                            className="border-app-border bg-app-background text-white
                            [&::-webkit-outer-spin-button]:appearance-none
                            [&::-webkit-inner-spin-button]:appearance-none
                            [-moz-appearance:textfield]
                        "/>
                    </div>
                   

                </div>

                <div>
                    <Label htmlFor="category_id" className="mb-2">Categoria</Label>
                    <Select
                        items={items}
                        value={categoryId}
                        onValueChange={setCategoryId}
                        >
                        <SelectTrigger className="w-full border-app-border bg-app-background text-white ">
                            <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>

                        <SelectContent className="border-app-border bg-app-background text-white w-100">
                            {items.map(item => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>


                <div>
                    <Label htmlFor="description" className="mb-2">Descrição</Label>
                    <Textarea  name="description" maxLength={50} placeholder="Escreva uma descrição"  className="border-app-border bg-app-background text-white"/>
                </div>


                <div>

                    <Field>
                        <FieldLabel htmlFor="file" className="mb-2">Imagem do Produto</FieldLabel>
                        <Input id="file" name="file" type="file" className="border-app-border  bg-app-background text-white! rounded-[10px] h-20" />
                    </Field>
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