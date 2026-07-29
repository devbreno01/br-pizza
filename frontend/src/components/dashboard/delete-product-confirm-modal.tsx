"use client"

import { Trash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
interface DeleteButtonProps {
   product_id: string
}

export function DeleteProductConfirmModal({product_id}: DeleteButtonProps)
{
    const [open,setOpen] = useState(false); 
    function handleConfirmDelete(e)
    {
        e.preventDefault(); 
        setOpen(true);
    }
    //need to implement this function 
    async function deleteProduct(e){
        e.preventDefault(); 
    }

    function handleCloseModal(e)
    {
        e.preventDefault(); 
        setOpen(false); 
    }
    
    return (
        <div className="space-y-4">
              <button 
            onClick={handleConfirmDelete} 
            className="flex items-center gap-1 text-red-500 hover:text-red-700"
        >
            <Trash className="h-4 w-4" />
            <span>Excluir</span>
        </button>
        
        <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className=" sm:p-6 bg-app-card text-white">
                    <DialogHeader>
                        <DialogTitle>Deseja realmente excluir o produto? </DialogTitle>
                    </DialogHeader>

                    <form className="flex flex-row gap-2">
                        <Button onSubmit={deleteProduct} className="bg-red-600 text-white ">Sim</Button>
                        <Button onClick={handleCloseModal}>Não</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>


    );
}