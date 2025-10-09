import { Userd } from "../models/userSchema.js";
import { catchAsyncHandler } from "./catchAsyncError.js";
import { ErrorHandler } from "./errorMiddleware.js";
import jwt from "jsonwebtoken"
export const isAdminAuthenticated = catchAsyncHandler(async (req,res,next)=>{
    const token = req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("admin not authenticated",400))

    }

    const decodeToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.userd = await Userd.findById(decodeToken.id)
    if(req.userd.role !== "Admin"){
        return next(new ErrorHandler(`${req.userd.role} not authorized for this resourse`,401))
    }
    next()
})
export const isPatientAuthenticated = catchAsyncHandler(async (req,res,next)=>{
    const token = req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("patient not authenticated",400))

    }

    const decodeToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.userd = await Userd.findById(decodeToken.id)
    if(req.userd.role !== "Patient"){
        return next(new ErrorHandler(`${req.userd.role} not authorized for this resourse`,401))
    }
    next()
})

