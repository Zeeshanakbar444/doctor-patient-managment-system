import dotenv from "dotenv"
dotenv.config()
import express from "express"
import userRouter from "./routes/userRoutes.js"
import postRouter from "./routes/postRoutes.js"
let app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
let port = process.env.PORT
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)

app.listen(port, () => {
    console.log(`app is listen on port number ${port}`)
})