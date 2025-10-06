import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js"
const app = express()
dotenv.config({path:"./.env"})
app.use(cors({
    origin:process.env.ORIGIN,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
})
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(fileUpload({
//     useTempFiles:true,
//     tempFileDir:true
// }))
app.use("/api/v1/message", messageRouter);
dbConnection()
export default app;
// http://localhost:5000/api/v1/message/send