import prismaClient from "../../prisma";
import cloudinary from "../../config/cloudinary";
import { Readable } from "stream";


interface CreateProductServiceProps{
    name: string, 
    price: number, 
    description: string, 
    category_id: string, 
    imageBuffer: Buffer, 
    imageName: string 
}


class CreateProductService {
    async execute({name ,price,description ,imageBuffer ,imageName ,category_id}: CreateProductServiceProps){

        const verifyCategory = prismaClient.category.findFirst({
            where:{
                id: category_id
            }
        }); 

        if(!verifyCategory){
            throw new Error("Categoria não existente"); 
        }

        let bannerUrl = ""; 

        try{
            const result = await new Promise<any>((resolve,reject)=>{
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder: "products", 
                    resource_type: "image", 
                    public_id: `${Date.now()} - ${imageName.split("")[0]}`
                }, (error, result)=>{
                    if(error){
                        reject(error); 
                    }else {
                        resolve(result)
                    }

                })

                const buffetStream = Readable.from(imageBuffer);
                buffetStream.pipe(uploadStream);
            }); 

            console.log(result); 

           
        }catch(error){
             throw new Error("Erro ao fazer o upload da imagem"); 
        }

        try{
            const product = prismaClient.product.create({
                data:{
                    name: name, 
                    price: price, 
                    description: description, 
                   // banner: banner, 
                    category_id: category_id
                }, 
                
                select:{
                    name: true, 
                    price: true, 
                    description: true, 
                    banner: true, 
                    disabled: true, 
                    category_id: true

                }
            }); 
        }catch(error){
            throw new Error("Erro ao tentar cadastrar produto. Tente novamente!"); 
        }
    }


}

export {CreateProductService}