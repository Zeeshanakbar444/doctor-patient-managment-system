import {Message}  from "../models/messageSchema.js"
export const sendMessage = async(req,res)=>{
    
  
    
    const{firstName,lastName,email,phone,message}  = req.body

    if(!firstName || !lastName||!email||!phone||!message ){
        return res.status(400).json({
            message :false,
            message:"please fill full form"
        })
    }
    console.log("firstName",firstName)

await Message.create({firstName,lastName,email,phone,message})

return res.status(200).json({
    success:true,
    message:"message send successfully"
})


}