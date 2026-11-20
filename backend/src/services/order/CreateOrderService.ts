import prismaClient from "../../prisma"
interface CreateOrderProps{
    user_id: string,
    business_id: string,
    table: number, 
    draft: boolean,
    status: boolean, 
    name?: string 
}
class CreateOrderService {
    async execute({
        user_id,
        business_id,
        table, 
        draft, 
        status, 
        name
    }: CreateOrderProps){
        try{
            const createOrder = await prismaClient.order.create({
                data:{
                    user_id,
                    business_id,
                    table: table, 
                    draft: draft, 
                    status: status, 
                    name: name 
                }, 
                select:{
                    table: true, 
                    draft: true, 
                    status: true, 
                    name: true 
                }
            })

            return createOrder; 
        }catch(error){
            throw new Error("Erro ao cadastro de ordem"); 
        }
        
    }
}

export {CreateOrderService}