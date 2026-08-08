
import ProductForm from "@/components/dashboard/product-form";
import { DeleteProductConfirmModal } from "@/components/dashboard/delete-product-confirm-modal";
import { Card, CardContent , CardHeader, CardTitle} from "@/components/ui/card"; 
import {Table, TableHeader , TableRow ,TableHead, TableBody, TableCell} from "@/components/ui/table";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { ApiResponse, Product } from "@/lib/types";
import Categories from "../categories/page";
import { formatPrice } from "@/lib/utils";
export default async function Products(){
    const token = await getToken(); 
    
    const response = await apiClient<ApiResponse<Product[]>>("/products",{
        token: token
    });
    const products = response.data.list; 

    //next steps:
    //mask for price 
    //option to show a image as a bigger resolution, like a modal

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Produtos</h1>
                    <p className="text-sm sm:text-base mt-1">Gerencie o cardápio da pizzaria</p>
                </div>
     
                <ProductForm/>
            
            </div>

            <div>
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
                                {products.map(product => {
                                    return (
                                        <TableRow key={product.id}>
                                            <TableCell className="font-medium">
                                                <img src={product.banner} alt="" className="h-14 w-14" />
                                            </TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{ formatPrice(product.price) }</TableCell>
                                            <TableCell className="text-right">{product.category?.name}</TableCell>
                                            <TableCell className="text-right">{product.description}</TableCell>
                                           <TableCell className="flex items-center justify-end gap-2 text-right">
                                                <DeleteProductConfirmModal product_id={product.id}/>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody> 

                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
        
        
    ); 
}