import express, {NextFunction, Request, Response} from "express"; 
import "dotenv/config"; 
import cors from 'cors'; 
import { router } from "./routes";

const app = express(); 
 
app.use(express.json()); 
app.use(cors());
app.use(router); 


app.use((error: Error, _:Request, res: Response, next: NextFunction)=>{
    if(error instanceof Error){
        return res.status(400).json({
            error: error.message,
        })
    }

    res.status(500).json({
        error: "Internal server error"
    });
});



const PORT = process.env.PORT; 


app.listen(PORT, ()=>{
    console.log("Servidor Rodando...");
}); 