import User from "../model/user.model.js"
import { customErrorHandler } from "../utils/error.js"
import bryptjs from "bcryptjs"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const signUp = async(req,res,next)=>{
    const {name,email,password} = req.body
    const encryptedPassword = bryptjs.hashSync(password,10)
    // console.log("Received data:", req.body);
    try {
        const newUser = new User({name,email,password:encryptedPassword})
        await newUser.save()
        res.status(200).json("User Created Successfully")
    } catch (error) {
        console.error("Signup error:", error);
       next(customErrorHandler(500,error.message))
    }
}

export const signIn = async(rer,res,next)=>{
    const {email,password} = req.body

    try {
        // find user
        const validUser = await findOne({email}) 
        // if user not true what happens
        if(!validUser) return next(customErrorHandler(404,"User not found"))
            // check if password is true
        const vaildPasword = bcrypt.compareSync(password,validUser.password)
        // if password is not true what happens
        if(!vaildPasword) return next(customErrorHandler(404,"Invalid User Cerdentials"))
            // assign token
        const token = JWT.sign({id:validUser._id},process.env.JWT_SECERT)

        res.cookie("access token",token, {httpOnly:true}).status(200).json("Logged in Successfully")
        
    } catch (error) {
        next(error)
    }
}