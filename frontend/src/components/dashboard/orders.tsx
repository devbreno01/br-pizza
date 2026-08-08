"use client"

import { apiClient } from "@/lib/api";
import { ApiResponse, Order } from "@/lib/types";
import { Card, CardHeader , CardTitle , CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Badge } from  "@/components/ui/badge";
import { Tags, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";

import Error from "next/error";
import { formatPrice } from "@/lib/utils"
import OrdersDialog from "./orders-dialog";

interface OrdersProps{
    token: string
}
export  function Orders({token}: OrdersProps){
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true); 

    useEffect(()=>{
        async function loadOrders(){
            
            try{
                const response = await apiClient<ApiResponse<Order[]>>("/orders?draft=false",{
                    method: "GET",
                    token: token 
                }); 
              
                if(response)
                {
                    let pendingOrders = response.listOrders.filter(order => !order.status)
                    setOrders(pendingOrders)
                    setLoading(false); 
                }

            }catch(e){
               console.log(e)
            }
        
        }

        loadOrders(); 
    }, [])
    
    const calcTotalOfOrder = (order) => {
        if(!order.itens) return 0; 

        return order.itens.reduce((total, item)=> {
            return total + item.product.price * item.amount
        }, 0); 
    }


    if (loading) return <p className="text-center text-gray-300">Loading...</p>;

    return (
         <div>
             {orders.length !==0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {orders.map(order =>{
                        return (
                            <Card
                                key={order.id}
                                className="bg-app-card border-app-border text-white"
                            >
                                <CardHeader>
                                    <div className="flex items-center justify-between gap-2">
                                        <CardTitle className="text-lg lg:text-xl font-bold">Mesa {order.table}</CardTitle>
                                        <Badge variant="secondary" className="text-xs select-none">PRODUÇÃO</Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-3 sm:space-y-4 mt-auto">
                                    <div>
                                        {order.itens && order.itens.length > 0 &&(
                                           <div className="space-y-1">
                                                {order.itens.slice(0,2).map(item =>(
                                                    <p key={item.id} className="text-xs sm:text-sm text-gray-300 truncate">
                                                        {item.amount} x {item.product.name}
                                                    </p>
                                                ))}
                                           </div>     
                                        )}
                                    </div>

                                    <div className="flex flex-col xl:flex-row items-center justify-between pt-4 border-t border-app-border gap-3">
                                        <div className="self-start">
                                            <p className="text-sm text-gray-400 md:text-base">Total</p>
                                            <p className="text-base font-bold text-brand-primary">{ formatPrice(calcTotalOfOrder(order)) }</p>
                                        </div>
                                       
                                       <OrdersDialog orderId={order.id} token={token}/>
                                        
                                    </div>
                                </CardContent>
                            </Card>
                         );


                    })}
                </div>
            ): ( <p className="text-center text-gray-300">Nenhum pedido encontrado</p>) }
         </div>
        
    )

    
}