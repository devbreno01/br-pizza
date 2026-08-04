"use client"

import { apiClient } from "@/lib/api";
import { ApiResponse, Order } from "@/lib/types";
import { Card, CardHeader , CardTitle , CardContent} from "@/components/ui/card";
import { Badge } from  "@/components/ui/badge";
import { Tags } from "lucide-react";
import { useEffect, useState } from "react";

import Error from "next/error";

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
                console.log(response)
                if(response)
                {
                    setOrders(response.listOrders)
                    setLoading(false); 
                }

            }catch(e){
               console.log(e)
            }
        
        }
        
        loadOrders(); 
    }, [])



  if (loading) return <p>Loading...</p>;

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
                                        <Badge variant="secondary" className="text-xs select-none">produção</Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-3 sm:space-y-4 mt-auto">
                                    <div>
                                        {order.items && order.items.length > 0 &&(
                                           <div className="space-y-1">
                                                {order.items.slice(0,2).map(item =>(
                                                    <p key={item.id} className="text-xs sm:text-sm text-gray-300 truncate">
                                                        {item.amount} x {item.product.name}
                                                    </p>
                                                ))}
                                           </div>     
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                         );


                    })}
                </div>
            ): ( <p>Sem dados</p>) }
         </div>
        
    )

    
}