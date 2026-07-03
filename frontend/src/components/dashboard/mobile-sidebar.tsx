
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
                    <Sheet>
                        <SheetTrigger>
                            <Button>
                                <Menu className="h6 w-6"/>
                            </Button>
                        </SheetTrigger>

                        <SheetContent>
                            <h2> VAI CARALHOOO</h2>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>
        </div>
    )
}