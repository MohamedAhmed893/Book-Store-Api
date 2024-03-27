
import express from 'express'
import * as authors from './author.controller.js'
import { authencation, authorization } from '../middleware/auths.js'

const authorRouter =express.Router()
authorRouter.post('/',authencation,authorization,authors.createAuthor)
authorRouter.get('/',authors.getAllAuthor)
authorRouter.get('/:id',authors.getSpacificAuthor)
authorRouter.put('/:id',authencation,authorization,authors.updateAuthor)
authorRouter.delete('/:id',authencation,authorization,authors.deleteAuthor)

export default authorRouter