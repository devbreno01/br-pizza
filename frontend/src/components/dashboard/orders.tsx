"use client"

import { apiClient } from "@/lib/api";
import { ApiResponse, Order } from "@/lib/types";
import { Card, CardHeader , CardTitle , CardContent} from "@/components/ui/card";
import { Tags } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "lucide-react";
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {orders.map(order =>{

                        return (
                            <Card
                                key={order.id}
                                className="bg-app-card border-app-border text-white transition-shadow hover:shadow-md w-120 h-100"
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base md:text-lg border">
                                        <span>MESA {order.table}</span>
                                        <span>Cliente: {order.name}</span>

                                        <div className="flex justify-end ml-24">
                                            <div className="flex justify-center  align-middle bg-app-border roudend-xl border">
                                                <span className="text-white">Em produção</span>
                                            </div>
                                        </div>
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-gray-200 text-sm">{order.id}</p>
                                </CardContent>
                            </Card>
                         );


                    })}
                </div>
            ): ( <p>Sem dados</p>) }
         </div>
        
    )

    
}