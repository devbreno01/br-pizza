
import ProductForm from "@/components/dashboard/product-form";

export default function Products(){

    return (
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Produtos</h1>
                <p className="text-sm sm:text-base mt-1">Gerencie o cardápio da pizzaria</p>
            </div>
     
            <ProductForm/>
        </div>
        
    ); 
}