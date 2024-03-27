import { bookModel } from "../../../databases/models/book.js"
import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../middleware/catchAsyncError.js"


const addBook= catchAsyncError(async(req,res,next)=>{
    const Book=new bookModel(req.body)
    await Book.save()
    res.json({message:"success",Book})
})

const getAllBook =catchAsyncError(async (req,res,next)=>{
    const Books =await bookModel.find({}).populate("author")
    res.json({message:"success",Books})
})
const getSpacificBook =catchAsyncError(async (req,res,next)=>{
    const {id}=req.params
    const Book =await bookModel.findById(id)
    if(!Book) return next(new AppError("Book Not Found",401))
    res.json({message:"success",Book})
})
const updateBook =catchAsyncError(async (req,res,next)=>{
    const {id}=req.params
    const Book =await bookModel.findById(id)
    if(!Book) return next(new AppError("Book Not Found",401))
    const update =await bookModel.findByIdAndUpdate(id,req.body,{new:true})
    res.json({message:"success",update})
})
const deleteBook =catchAsyncError(async (req,res,next)=>{
    const {id}=req.params
    const Book =await bookModel.findById(id)
    if(!Book) return next(new AppError("Book Not Found",401))
    const deleted =await bookModel.findByIdAndDelete(id)
    res.json({message:"Book has been Deleted",deleted})
})


export {
    addBook ,
    getAllBook ,
    getSpacificBook ,
    updateBook ,
    deleteBook
}