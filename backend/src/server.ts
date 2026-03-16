import express, {NextFunction, Request, Response} from "express"; 
import "dotenv/config"; 
import cors from 'cors'; 


const app = express(); 
app.use(cors()); 
app.use(express.json()); 

const PORT = process.env.PORT; 

app.listen(PORT, ()=>{
    console.log("Servidor Rodando...");
}); 