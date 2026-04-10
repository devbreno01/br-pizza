import multer from 'multer';

//salvar no memory storage e enviar diretamente pro cloudnary 

export default {
    storage: multer.memoryStorage(), 
    limits: {
        fileSize: 5 * 1024 * 1024 //5mb

    },
    fileFilter: (req: any, file: Express.Multer.File, callback: any) =>{
        const allowedMimes = ["image/jpeg","image/jpg", "image/png"]; 

        if(allowedMimes.includes(file.mimetype)){
            callback(null, true); 
        }else{
            callback(new Error("Formato de arquivo invalido")); 
        }

    }
}