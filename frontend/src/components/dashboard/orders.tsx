"use client"

import { apiClient } from "@/lib/api";
import { ApiResponse, Order } from "@/lib/types";
import { Card, CardHeader , CardTitle , CardContent} from "@/components/ui/card";
import { Tags } from "lucide-react";

interface OrdersProps{
    token: string
}
export async function Orders({token}: OrdersProps){
    const response = await apiClient<ApiResponse<Order[]>>("/orders",{
        method: "GET",
        token: token 
    }); 

    const orders  = response.data; 

    return (
         <div>
             {orders.length !==0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {orders.map(order =>{
                        return (
                            <Card 
                                key={order.id}
                                className="bg-app-card border-app-border text-white transition-shadow hover:shadow-md">
                                <CardHeader>
                                    <CardTitle className="gap-2 flex items-center text-base md-text-lg">  
                                         <Tags className="w-5 h-5"></Tags>
                                        <span>MESA {order.table}</span>
                                        <span>Cliente: {order.name}</span>
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-gray-200 text-sm">{order.id}</p>
                                </CardContent>
                            </Card>
                        )
                    } )}
                </div>
            )}
         </div>
        
    )

    
}