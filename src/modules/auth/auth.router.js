import express from 'express'
import * as auth from './auth.controller.js'

const authRouter =express.Router()

authRouter.post('/register', auth.signUp)
authRouter.post('/login', auth.signIn)

export default authRouter