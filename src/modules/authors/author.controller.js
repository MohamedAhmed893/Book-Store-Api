import { authorModel } from "../../../databases/models/author.js"
import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../middleware/catchAsyncError.js"


const createAuthor= catchAsyncError(async(req,res,next)=>{
    const author=new authorModel(req.body)
    await author.save()
    res.json({message:"success",author})
})

const getAllAuthor =catchAsyncError(async (req,res,next)=>{
    const authors =await authorModel.find({})
    res.json({message:"success",authors})
})
const getSpacificAuthor =catchAsyncError(async (req,res,next)=>{
    const {id}=req.params
    const author =await authorModel.findById(id)
    if(!author) return next(new AppError("Author Not Found",401))
    res.json({message:"success",author})
})
const updateAuthor =catchAsyncError(async (req,res,next)=>{
    const {id}=req.params
    const author =await authorModel.findById(id)
    if(!author) return next(new AppError("Author Not Found",401))
    const update =await authorModel.findByIdAndUpdate(id,req.body,{new:true})
    res.json({message:"success",update})
})
const deleteAuthor =catchAsyncError(async (req,res,next)=>{
    const {id}=req.params
    const author =await authorModel.findById(id)
    if(!author) return next(new AppError("Author Not Found",401))
    const deleted =await authorModel.findByIdAndDelete(id)
    res.json({message:"Author has been Deleted",deleted})
})


export {
    createAuthor ,
    getAllAuthor ,
    getSpacificAuthor ,
    updateAuthor ,
    deleteAuthor
}