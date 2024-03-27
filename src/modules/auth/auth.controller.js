import { userModel } from "../../../databases/models/user.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import bcrypt from 'bcrypt'


const signUp =catchAsyncError(async(req,res,next)=>{

    const isFound =await userModel.findOne({email:req.body.email})
    if(isFound) return next(new AppError("Account Already Exist",401))
    const newUser =new userModel(req.body);
     await newUser.save();
     const {password,...other}=newUser._doc;
     let token =newUser.generateToken()
     res.status(201).json({...other,token});
})

const signIn =catchAsyncError(async (req,res,next)=>{
    const isFound =await userModel.findOne({email:req.body.email})
    if(!isFound ||!(await bcrypt.compare(req.body.password,isFound.password))) return next(new AppError("Account Not Found or Password Wrong",401))
    const {password,...other}=isFound._doc;
     let token =isFound.generateToken()
    res.status(201).json({...other ,token})
})

export {
    signUp ,
    signIn
}