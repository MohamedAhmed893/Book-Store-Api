import { userModel } from "../../../databases/models/user.js"
import { AppError } from "../../utils/AppError.js"
import jwt from 'jsonwebtoken'

const authencation = async(req,res,next)=>{

    const token =req.headers.token
    if(!token) return next(new AppError("Not Token Provided",401))
    const decoded =await jwt.verify(token, process.env.SECRET_KEY1)
    const user =await userModel.findById(decoded._id)
    if (!user) return next(new AppError("In Valid Token or User Not Found",401))
    req.user=user;
    next()
}
const authorization =async (req,res,next)=>{
    if(!req.user.isAdmin) return next(new AppError("You are not authorized to access this route you are User ",401))
    next()
}
export {
    authencation ,
    authorization
}