import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const  userSchema = mongoose.Schema({
    userName:{
        type:String ,
        minLength:[2, 'username must be at least 2 characters'],
        maxLength:[15, 'username can not exceed 15 characters'] ,
        required: [true,'user name is required'] ,
        trim:true
    },
    email:{
        type:String ,
        minLength:[2, 'email must be at least 2 characters'],
        unique:true ,
        required: [true,'Email is required'] ,
        trim:true
    },
    password:{
        type:String ,
        required: [true,'Email is required'] 
    },
    isAdmin:{
        type:Boolean ,
        default:false
    }
},{timestamps:true})

userSchema.pre('save',function(){
    this.password=bcrypt.hashSync(this.password, 7);
})

userSchema.methods.generateToken =function(){
  return  jwt.sign({id:this._id,isAdmin:this.isAdmin,email:this.email},process.env.SECRET_KEY1)
}

export const userModel=mongoose.model('user',userSchema)