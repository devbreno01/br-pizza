import prismaClient from "../../prisma";
import cloudinary from "../../config/cloudinary";
import { Readable } from "stream";


interface CreateProductServiceProps{
    business_id: string,
    name: string, 
    price: number, 
    description: string, 
    category_id: string, 
    imageBuffer: Buffer, 
    imageName: string 
}


class CreateProductService {

    async execute({business_id, name ,price,description ,imageBuffer ,imageName ,category_id}: CreateProductServiceProps){

        const verifyCategory = await prismaClient.category.findFirst({
            where:{
                id: category_id,
                business_id
            }
        }); 

        if(!verifyCategory){
            throw new Error("Categoria não existente"); 
        }
        
        
        
        let bannerUrl: string = ""; 
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

                });

                const buffetStream = Readable.from(imageBuffer);
                buffetStream.pipe(uploadStream);
            }); 

            
            bannerUrl  = result.secure_url; 

           
        }catch(error){
             throw new Error("Erro ao fazer o upload da imagem"); 
        }

        const product = await prismaClient.product.create({
            data:{
                name: name, 
                price: price, 
                description: description, 
                business_id,
                category_id: category_id, 
                banner: bannerUrl 
            }, 
            select:{
                id: true, 
                name: true, 
                price: true, 
                description: true, 
                banner: true,
                category_id: true, 
                createdAt: true

            }
        });

        return product; 
    }


}

export {CreateProductService}