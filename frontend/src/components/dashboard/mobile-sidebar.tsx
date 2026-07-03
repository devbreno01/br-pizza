
"use client"

import {ShoppingCart, Package, Tags , Menu } from "lucide-react"; 
import Link  from "next/link";
import {usePathname} from "next/navigation"
import { cn } from "@/lib/utils";
import {Button} from "@/components/ui/button"; 
import { LogOut } from "lucide-react";
import { logOutAction } from "@/actions/auth";
import { Sheet, 
        SheetClose , 
        SheetContent , 
        SheetDescription, 
        SheetHeader, 
        SheetTitle, 
        SheetTrigger , 
        SheetFooter } 
from "@/components/ui/sheet";

import { useState , } from "react"

export function MobileSideBar()
{
    const pathName = usePathname();
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

    const [open, setOpen] = useState(false); 

    return (
        <div className="lg:hidden">
            <header className="sticky top-0 z-50 border-b border-app-border bg-app-card">
                <div className="flex h-16 items-center justify-between px-4">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger>
                            <Menu className="h6 w-6"/>
                        </SheetTrigger>

                        <SheetContent className="bg-app-sidebar border-r border-app-border w-72 p-0" side="left">
                            <SheetHeader className="border-b border-app-border p-6">
                                <SheetTitle className="tect-xl text-white font-bold">Menu</SheetTitle>
                            </SheetHeader>

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

                            <div className="absolute w-full bottom-0 border-t border-app-border p-4">
                                <form action={logOutAction}>
                                    <Button
                                        type="submit"
                                        variant="ghost"
                                        className="w-full justify-start gap-3 text-white hover:text-white hover:bg-transparant">
                                        <LogOut className="w-5 h-5"/>
                                        Sair
                                    </Button>
                                </form>
                            </div>

                        </SheetContent>
                    </Sheet>

                    <h1 className="text-lg font-bold">
                        Br<span className="text-brand-primary">Pizza</span>
                    </h1>
                    <div className="w-10"></div>
                </div>
            </header>
        </div>
    )
}