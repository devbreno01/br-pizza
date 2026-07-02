import {getRequiredUser} from "@/lib/auth"; 
import { SideBar } from "@/components/dashboard/SideBar";


export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) 
{
    const user = await getRequiredUser(); 
    const userInfo = user.user; 
   
    return (
        <div>
            <SideBar userName={userInfo.name}/>
            {children}
        </div>
    )
}