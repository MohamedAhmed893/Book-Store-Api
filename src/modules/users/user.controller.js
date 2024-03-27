import { userModel } from "../../../databases/models/user.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";


const getUser =catchAsyncError(async (req,res,next)=>{
    const user =await userModel.findById(req.user._id)
    !user && next(new AppError("User Not Found",400))
    user && res.json({message:"success",user})
})

const updateUser =catchAsyncError(async (req,res,next)=>{
    const user =await userModel.findById(req.user._id)
    if(!user) return next(new AppError("Your Are not Authorized To update user" ,401))
    const newUpdate =await userModel.findByIdAndUpdate(req.user._id,req.body,{new:true})
    res.json({message:"success",newUpdate})
})
const deleteUser =catchAsyncError(async (req,res,next)=>{
    const user =await userModel.findById(req.user._id)
    if(!user) return next(new AppError("Your Are not Authorized To Delete user" ,401))
    const newUpdate =await userModel.findByIdAndDelete(req.user._id)
    res.json({message:"Account Deleted"})
})

export {
    getUser ,
    updateUser ,
    deleteUser
}