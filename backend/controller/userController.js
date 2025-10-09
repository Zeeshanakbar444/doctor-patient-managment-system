import { catchAsyncHandler } from "../middleware/catchAsyncError.js";
import { ErrorHandler } from "../middleware/errorMiddleware.js";
import { Userd } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
export const patientRegister = catchAsyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !role
  ) {
    return next(new ErrorHandler("please fill the form", 400));
  }

  const userd = await Userd.findOne({ email });

  if (userd) {
    return next(new ErrorHandler("user already exist", 400));
  }
  let createUserd = await Userd.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  });
  generateToken(createUserd._id, "User Registered!", 200, res);

});

export const login = catchAsyncHandler(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password & Confirm Password Do Not Match!", 400)
    );
  }
  const userd = await Userd.findOne({ email }).select("+password");
  if (!userd) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  const isPasswordMatch = await userd.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }
  if (role !== userd.role) {
    return next(new ErrorHandler(`User Not Found With This Role!`, 400));
  }
  generateToken(userd, "Login Successfully!", 201, res);
});

export const addNewAdmin = catchAsyncHandler(async (req,res,next)=>{
    const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic 
  ) {
    return next(new ErrorHandler("please fill the form", 400));
  }
    const userd = await Userd.findOne({ email });

  if (userd) {
    return next(new ErrorHandler("user already exist", 400));
  }

  const admin = await Userd.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role:"Admin",
  })
  res.status(200).json({
    success:true,
    message:"new Admin register"
  })
})



export const getAllDoctor = catchAsyncHandler(async(req,res,next)=>{
const doctors = await Userd.find({role:"Doctor"});
res.status(200).json({
  success:true,
  doctors
})
})

export const getUserDetails = catchAsyncHandler(async(req,res,next)=>{
const userd  = req.userd;
res.status(200).json({
  success:true,
  userd
})
})


export const logoutAdmin = catchAsyncHandler(async (req,res,next)=>{
  
  res.status(200).
  cookie("adminToken","",{httpOnly:true,expires:new Date(Date.now())})
 .json({
    success:true,
    message:"user logout successfully"
  })
})
export const logoutPatient = catchAsyncHandler(async (req,res,next)=>{
  
  res.status(200).
  cookie("patientToken","",{httpOnly:true,expires:new Date(Date.now())})
 .json({
    success:true,
    message:"user logout successfully"
  })
})