
import { getToken } from "@/lib/auth";
import { Orders } from "@/components/dashboard/orders";

export default async function Dashboard(){

    const token = await getToken(); 
  
    return (
          <div className="space-y-4 sm:space-y-6">
                <Orders token={token!} />
          </div>
    )
}