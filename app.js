import express from 'express'
import { dbconnection } from './databases/dbconnection.js'
import authorRouter from './src/modules/authors/author.router.js'
import { AppError } from './src/utils/AppError.js'
import bookRouter from './src/modules/books/book.router.js'
import dotenv from 'dotenv'
import authRouter from './src/modules/auth/auth.router.js'
import userRouter from './src/modules/users/user.router.js'


const app =express()
app.use(express.json())

dotenv.config()

app.use('/authors',authorRouter)
app.use('/books',bookRouter)
app.use('/auth',authRouter)
app.use('/users',userRouter)



app.all("*",(req,res,next)=>{
    next(new AppError("Page Not Found "+req.originalUrl ,404))
})
app.use((err,req,res,next)=>{
    let Code =err.statusCode || 500
    res.status(Code).json({message:err.message,stack:err.stack})
})
dbconnection()

app.listen(process.env.PORT,()=>{
    console.log("Server is Running .......");
})