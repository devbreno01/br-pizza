"use client"

import React, { useState, useActionState, useEffect } from "react";
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
import { Plus, Upload } from "lucide-react";
import { apiClient } from "@/lib/api";
import { ApiResponse, Category } from "@/lib/types";
import { getToken } from "@/lib/auth";
import { getCategories } from "@/actions/category";
import { createAction } from "@/actions/product";
import Image from "next/image";
import { useRouter } from "next/navigation";


const initialState = {
  success: false,
  error: null,
}

export default function ProductForm(){
    const router = useRouter();
    const [open, setOpen]  = useState(false); 
    const [categories, setCategories] = useState([]); 
    const [categoryId, setCategoryId] = useState(""); 
    const [price, setPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

  

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

    function convertBrlToCents(value: string):number
    {
       const cleanValue = value.replace(/\./g,"");
       const reais =  parseFloat(cleanValue);
       return Math.round(reais * 100);
    }

    async function handleCreateProduct(e: React.SubmitEvent<HTMLFormElement>)
    {
        e.preventDefault(); 
        setIsLoading(true); 
        
        const formElement = e.currentTarget; 
        const name = (formElement.elements.namedItem('name') as HTMLInputElement).value;
        const price = (formElement.elements.namedItem('price') as HTMLInputElement).value;
        const priceInCents = convertBrlToCents(price);
        const description = (formElement.elements.namedItem('description') as HTMLInputElement).value;
        const category_id= (formElement.elements.namedItem('category_id') as HTMLInputElement).value;
    


        const formData = new FormData(); 
        formData.append('name', name); 
        formData.append('price', priceInCents.toString()); 
        formData.append('description', description); 
        formData.append('category_id', category_id); 
        formData.append('file',imageFile); 

        const result = await createAction(formData)
        
        console.log(result); 
        if(result.success)
        {
            console.log('atributo true')
            /*
            setOpen(false);
            router.refresh(); 
            return; */
        }else {
            alert(result.error)
        }

    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        console.log('target files',  e.target.files?.[0]);
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                return;
            }

            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    }

     function clearImage() {
        setImageFile(null);
        setImagePreview(null);
    }

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

            <form className="space-y-6" >
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


                 <div className="space-y-2">
                    <Label htmlFor="file" className="mb-2">
                        Imagem do produto
                    </Label>
                    {imagePreview ? (
                        <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                            <Image
                            src={imagePreview}
                            alt="preview da imagem"
                            fill
                            className="object-cover z-10"
                            />

                            <Button
                            type="button"
                            variant="destructive"
                            onClick={clearImage}
                            className="absolute top-2 right-2 z-20"
                            >
                            Excluir
                            </Button>
                        </div>
                    ) : (
                        <div className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center">
                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <Label htmlFor="file">Clique para selecionar uma imagem</Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="image/jpeg,image/jpg,image/png"
                                onChange={handleImageChange}
                                required
                                className="hidden"
                            />
                        </div>
                    )}
          </div>
                <Button
                    type="submit"
                    variant="ghost"
                    className="w-full bg-brand-primary text-white hover:bg-brand-primary ">
                    
                    {/* { isPeding ? 'Salvando' : 'Criar'} */}
                    Criar
                </Button>

             
            </form>
        </DialogContent>
      </Dialog>
    )
}