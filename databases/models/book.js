import mongoose from "mongoose";

const bookSchema =mongoose.Schema({
    title :{
        type:String ,
        trim:true ,
        minLength:[2,"The title is to Short"],
        maxLength:[20,"The title is to long"] ,
        required:true
    } ,
    author:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"author"
    } ,
    description:{
        type:String ,
        trim:true ,
        required:true
    } ,
    price:{
        type:Number ,
        required:true
    } ,
    cover:{
        type:String ,
        required:true ,
        enum:['soft cover','hard cover']
    }
},{timestamps:true})

export const bookModel =mongoose.model('book',bookSchema)