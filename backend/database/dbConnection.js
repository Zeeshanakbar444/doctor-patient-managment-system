import mongoose from "mongoose";


export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"youtube"
    }).then(()=>{
        console.log("connected to database");
        
    }).catch((err)=>{
        console.log("some error in dbb connection",err)
    })
}