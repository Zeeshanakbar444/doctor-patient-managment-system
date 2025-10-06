import mongoose ,{Schema}from "mongoose";
import validator from "validator"

const messageSchema   =new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"first name must contain 3 letter"],
        
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"first name must contain 3 letter"],

    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"provide valid email"],

    },
    phone:{
        type:String,
        required:true,
        minLength:[11,"phone number must contain 11 number "],
        maxLength:[11,"phone number must contain 11 number "]
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"message must contain 10 letter"],
        
    }
})
export const Message = mongoose.model("Message", messageSchema);