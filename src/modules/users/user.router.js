import express from 'express'
import { authencation } from '../middleware/auths.js'
import * as User from './user.controller.js'


const userRouter =express.Router()

userRouter.get('/',authencation ,User.getUser)
userRouter.put('/',authencation ,User.updateUser)
userRouter.delete('/',authencation ,User.deleteUser)

export default userRouter