
import { getToken } from "@/lib/auth";
import { Orders } from "@/components/dashboard/orders";

export default async function Dashboard(){

    const token = await getToken(); 
  
    return (
          <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                              <h1 className="text-2xl sm:text-3xl font-bold text-white">Pedidos</h1>
                              <p className="text-sm sm:text-base mt-1">Gerencie seus pedidos</p>
                        </div>
                  </div>
                  <Orders token={token!} />
          </div>
    )
}