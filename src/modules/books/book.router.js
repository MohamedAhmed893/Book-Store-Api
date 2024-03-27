import express from 'express'
import * as books from './book.controller.js'
import { authencation, authorization } from '../middleware/auths.js'

const bookRouter =express.Router()

bookRouter.post("/",authencation,authorization,books.addBook)
bookRouter.get("/",books.getAllBook)
bookRouter.get("/:id",books.getSpacificBook)
bookRouter.put("/:id",authencation,authorization,books.updateBook)
bookRouter.delete("/:id",authencation,authorization,books.deleteBook)

export default bookRouter