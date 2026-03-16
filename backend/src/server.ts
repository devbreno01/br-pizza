import express, {NextFunction, Request, Response} from "express"; 
import "dotenv/config"; 
import cors from 'cors'; 
import { router } from "./routes";

const app = express(); 
 
app.use(express.json()); 
app.use(cors());
app.use(router); 

const PORT = process.env.PORT; 

app.listen(PORT, ()=>{
    console.log("Servidor Rodando...");
}); 