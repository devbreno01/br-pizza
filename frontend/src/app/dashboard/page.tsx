

import { Card, CardHeader , CardTitle , CardContent} from "@/components/ui/card";
import { Tags } from "lucide-react";
import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { ApiResponse, Order } from "@/lib/types";
import { Orders } from "@/components/dashboard/orders";

export default async function Dashboard(){

    const token = await getToken(); 
  
    return (
          <div className="space-y-4 sm:space-y-6">
                <Orders token={token!} />
          </div>
    )
}