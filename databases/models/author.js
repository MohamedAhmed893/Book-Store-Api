import mongoose from "mongoose";

const authorSchema=mongoose.Schema({
    firstName:{
        type:String ,
        trim:true ,
        minLength:[2,"The First Name is to Short"],
        maxLength:[20,"The First Name is to long"] ,
        required:true
    } ,
    lastName:{
        type:String ,
        trim:true ,
        minLength:[2,"The last Name is to Short"],
        maxLength:[20,"The last Name is to long"] ,
        required:true
    } ,
    
    nationality:{
        type:String ,
        trim:true ,
        required:true
    } ,
    image:{
        type:String ,
        default:"default-avatar.png"
    }
},{timestamps:true})

export const authorModel=mongoose.model('author',authorSchema)