"use client"

import { Card, CardContent , CardHeader, CardTitle} from "@/components/ui/card"; 
import {Table, TableHeader , TableRow ,TableHead, TableBody, } from "@/components/ui/table"


export default function ProductList(){
    return(
        <Card className="bg-app-card text-white">
            <CardContent className="w-full">
                <Table> 
                     <TableHeader className="hover:pointer-events-none">
                        <TableRow className="">
                            <TableHead className="w-[100px] text-white">Imagem</TableHead>
                            <TableHead className="text-white">Nome</TableHead>
                            <TableHead className="text-white">Preço</TableHead>
                            <TableHead className="text-right text-white">Categoria</TableHead>
                            <TableHead className="text-right text-white">Descrição</TableHead>
                            <TableHead className="text-right text-white">Ações</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        
                    </TableBody>

                </Table>
            </CardContent>
        </Card>
    )
}