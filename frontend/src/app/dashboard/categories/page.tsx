
""
import { getToken } from "@/lib/auth"
import { apiClient } from "@/lib/api"
import { ApiResponse, Category,  } from "@/lib/types";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Tags } from "lucide-react";

import { CategoryForm } from "@/components/dashboard/category-form"


export default async function Categories()
{
    const token = await getToken(); 
    const response = await apiClient<ApiResponse<Category[]>>("/categories", {
        token: token!
    })

    const categories = response.data 

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Categorias</h1>
                    <p className="text-sm sm:text-base mt-1">Organize suas categorias</p>
                </div>

                <CategoryForm/>
            </div>


            {categories.length !==0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categories.map(category =>{
                        return (
                            <Card 
                                key={category.id}
                                className="bg-app-card border-app-border text-white transition-shadow hover:shadow-md">
                                <CardHeader>
                                    <CardTitle className="gap-2 flex items-center text-base md-text-lg">  
                                         <Tags className="w-5 h-5"></Tags>
                                        <span>{category.name}</span>
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-gray-200 text-sm">{category.id}</p>
                                </CardContent>
                            </Card>
                        )
                    } )}
                </div>
            )}
        </div>
    ); 
}