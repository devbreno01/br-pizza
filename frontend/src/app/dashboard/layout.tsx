import {getRequiredUser} from "@/lib/auth"; 

export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode
})
{
    const user = await getRequiredUser(); 
    return (
        <div>
            {children}
        </div>
    )
}