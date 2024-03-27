import dotenv from 'dotenv'
import { dbconnection } from './databases/dbconnection.js'
import { bookModel } from './databases/models/book.js'
import { books } from './data.js'

dotenv.config()
dbconnection()


const importBooks =async()=>{
    try{
        await bookModel.insertMany(books)
        console.log('Data imported successfully')
    }catch(err){
        console.log(err);
        process.exit(1)
    }
}
// const removeBooks =async()=>{
//     try{
//         await bookModel.deleteMany(books)
//         console.log('Data removed successfully')
//     }catch(err){
//         console.log(err);
//         process.exit(1)
//     }
// }

if(process.argv[2] === '-import'){
    importBooks()
}