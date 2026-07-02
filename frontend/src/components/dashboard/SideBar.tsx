"use client"

import {ShoppingCart, Package, Tags } from "lucide-react"; 
import Link  from "next/link";
import {usePathname} from "next/navigation"
import { cn } from "@/lib/utils";
 
interface SideBarProps {
    userName: string
}

export function SideBar({userName} : SideBarProps)
{
    const menuItems = [
        {
            title: "Pedidos", 
            href: "/dashboard",
            icon: ShoppingCart
        }, 
        {
            title: "Produtos", 
            href: "/dashboard/products",
            icon: Package
        }, 

        {
            title: "Categorias", 
            href: "/dashboard/categories",
            icon: Tags
        }
    ]; 

    const pathName = usePathname(); 

    return (
        <aside className="hidden lg:flex flex-col h-screen w-64 border-r border-app-border bg-app-sidebar">
            {/* header */}
            <div className="border-b border-app-border p-6">
                <h2 className="text-xl font-bold text-white">Br<span className="text-brand-primary">Pizza</span></h2>
                <p className="text-sm text-gray-300 mt-1">Olá {userName}</p>
            </div>

            <nav className="flex-1 p-4 space-y-4">
                {menuItems.map(menu => {
                    const isActive = pathName === menu.href
                    const Icon = menu.icon
                    return (
                        <Link href={menu.href} key={menu.href} className={cn("flex items-center gap-3 px-3 py-2 text-sm rounded-md font-medium transition-colors duration-300", 
                            isActive ? "bg-brand-primary text-white" : "text-white hover:bg-gray-400"
                        )}>
                            <Icon className="w-5 h-5 mr-2"></Icon>
                            {menu.title}
                        </Link>
                    )
                })}
            </nav>

        </aside>
             
       
    )
}