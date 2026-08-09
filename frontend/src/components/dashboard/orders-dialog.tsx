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

import { Button} from "@/components/ui/button";

import { EyeIcon } from "lucide-react"; 
import { useEffect, useState } from "react";
import { ApiResponse, Order } from "@/lib/types";
import { apiClient } from "@/lib/api";
import { formatPrice } from "@/lib/utils";


interface OrderDialogProps {
    orderId: string | null;
    token: string;
}
export default function OrdersDialog({ orderId,token }:OrderDialogProps  ){
    const [open, setOpen ]  = useState(false); 
    const [loading,setLoading] = useState(false); 
    const [order, setOrder] = useState<Order | null>(null);
   

    const fetchOrder = async () =>{
        if (!orderId) {
            setOrder(null);
            return;
        }

        try{
            setLoading(true)
           
            const response = await apiClient<Order>(
                `/order/detail/${orderId}`,
                {
                    method: "GET",
                    token: token,
                }
            );
            
            setOrder(response)
            setLoading(false)
            
        }catch(e){
            console.log(e)
        }
    }

    function handleModal(){
        setOpen(true); 
    }

    const calculateTotal = () => {
        return 20; 
    }

    const onClose = () => {
        setOpen(false)
    }

    const finishOrder = async () => {
      
        setLoading(true); 
           
        const formElement = e.currentTarget; 
        
        const name = order?.name || 'Sem nome';   
        const order_id = orderId;

        if(!order_id){
            return; 
        }

        const payload = {
            name: name, 
            order_id: orderId
        }

       try{
            const response = await apiClient("/order/finish",{
                method: "PUT", 
                token: token, 
                body:JSON.stringify(payload)
            });

            setOpen(false)
       }catch(e){
            console.log(e)
       }
    } 


    useEffect(()=>{
        if(open){
             fetchOrder();
        }
    },[open])

    let total = 0; 
    return (
        <div>
            <Button onClick={handleModal} size="sm" className="bg-brand-primary hover:bg-brand-primary w-full lg:w-auto"> 
                <EyeIcon className="w-5 h-5"/>
                Detalhes 
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="p-6 bg-app-card text-white max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            Detalhe do pedido
                        </DialogTitle>
                    </DialogHeader>

                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <p className="text-gray-400">Carregando...</p>
                        </div>
                    ) : order ? (
                        <div className="space-y-6">
                            {/* Informações do pedido */}
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Nome da categoria</p>
                                    <p className="text-lg font-semibold">Mesa {order.table}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Cliente</p>
                                    <p className="text-lg font-semibold">
                                    {order.name || "Sem nome"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Status</p>
                                    <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-sm font-medium">
                                        Em produção
                                    </span>
                                </div>
                            </div>

                        {/* Itens do pedido */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Itens do pedido</h3>
                            <div className="space-y-3">
                                {order.itens && order.itens.length > 0 ? (
                                order.itens.map((item) => {
                                    const subtotal = item.product.price * item.amount;
                                    total += subtotal;
                                    
                                    return (
                                        <div
                                            key={item.id}
                                            className="bg-app-background rounded-lg p-4 border border-app-border"
                                        >
                                            <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-base mb-1">
                                                {item.product.name}
                                                </h4>
                                                <p className="text-sm text-gray-400">
                                                {item.product.description}
                                                </p>
                                                <p className="text-sm text-gray-400 mt-2">
                                                {formatPrice(item.product.price)} x {item.amount}
                                                </p>
                                            </div>
                                            <div className="text-right ml-4">
                                                <p className="text-sm text-gray-400 mb-1">
                                                    Quantidade: {item.amount}
                                                </p>
                                                <p className="font-semibold text-lg">
                                                    Subtotal: {formatPrice(subtotal)}
                                                </p>
                                            </div>
                                            </div>
                                        </div>
                                    );
                                })
                                ) : (
                                <p className="text-gray-400 text-center py-4">
                                    Nenhum item no pedido
                                </p>
                                )}
                            </div>
                        </div>

                        {/* Total */}
                        <div className="border-t border-app-border pt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-bold">Total</span>
                            <span className="text-2xl font-bold text-brand-primary">
                            {formatPrice(total)}
                            </span>
                        </div>
                        </div>
                    </div>
                ) : null}

                <DialogFooter className="flex gap-3 sm:gap-3">
                    <Button
                        variant="outline"
                        onClick={() => onClose()}
                        className="flex-1 border-app-border hover:bg-transparent bg-transparent text-white hover:text-white"
                    >
                        Fechar
                    </Button>
                    <Button
                        className="flex-1 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold"
                        disabled={loading}
                        onClick={finishOrder}
                    >
                        Finalizar pedido
                    </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>

    )
}