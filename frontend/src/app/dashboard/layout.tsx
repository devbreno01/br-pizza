import { getRequiredUser } from "@/lib/auth"; 
import { SideBar } from "@/components/dashboard/SideBar";
import { MobileSideBar } from "@/components/dashboard/mobile-sidebar"


 

export default async function DashboardLayout({children}: {children: React.ReactNode}) 
{
    const user = await getRequiredUser(); 
    const userInfo = user.user; 
   
    return (
        <div className=" flex h-screen overflow-hidden text-white">
            <SideBar userName={userInfo.name}/>

            <div className="flex flex-1 flex-col overflow-hidden">

                <MobileSideBar/>

                <main className="flex-1 overflow-y-auto bg-app-background">
                    <div className="container-max-width-full px-4 py-6">
                        {children}
                    </div>
                </main>

            </div>

          
        </div>
    )
}