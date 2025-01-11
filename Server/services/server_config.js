import express from 'express';
import dotenv from 'dotenv';
dotenv.config({path:".env"})


const app = express();
const PORT = process.env.PORT || 8000

export const server_Config = ()=>{
    try {
        app.listen(PORT,()=>{
            console.log(`Server is running on port http://localhost:${PORT}`)
        })
        
    } catch (error) {
        console.error(error)
    }
}