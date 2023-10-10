import  express from "express"
import { Request, Response } from "express"
import dotenv from "dotenv"
//initialisation dotenv
dotenv.config();
import myDataSource  from "./app-data-source"
import router from "./router/user.router"
import cors from "cors"
import cookieParser from 'cookie-parser';




//database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// create and setup express app

const port= process.env.PORT

const app = express()

app.use(cors({
    origin: 'http://localhost:3000', // Remplacez par l'URL de votre client
    credentials: true
}))

app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.json())

app.get('/',(req:Request,res:Response)=>{
    res.send('hello')
})

app.use('/',router)

app.use('/static',express.static('D:/ENI/projet/Test-node-ts/uploads'))



// start express server
app.listen(port,()=>{
    console.log("l'application marche sur localhost:" + port)
})