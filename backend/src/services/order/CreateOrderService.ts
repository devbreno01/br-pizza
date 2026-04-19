import prismaClient from "../../prisma"
interface CreateOrderProps{
    table: number, 
    draft: boolean,
    status: boolean, 
    name?: string 
}
class CreateOrderService {
    async execute({
        table, 
        draft, 
        status, 
        name
    }: CreateOrderProps){
        try{
            const createOrder = await prismaClient.order.create({
                data:{
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