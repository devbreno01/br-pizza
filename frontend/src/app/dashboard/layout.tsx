import {getRequiredUser} from "@/lib/auth"; 
import { SideBar } from "@/components/dashboard/SideBar";
import {} from "lucide-react"; 

export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) 
{
    const user = await getRequiredUser(); 
    return (
        <div>
            <SideBar userName={user?.name}/>
            {children}
        </div>
    )
}