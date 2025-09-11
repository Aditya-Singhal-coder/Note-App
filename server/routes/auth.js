import express from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// for register
router.post('/register', async(req,res)=>{
    try {
        // access the data from body
        const {name , email, password} = req.body;
        const user = await User.findOne({email});

        if(user){
            // user email is exist
            return res.status(401).json({success: false, message: "User already exist"})
        }

        // if user is not alrady exist then need to hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name, email, password: hashPassword // assign passwrod as hashpasword
        })

        await newUser.save(); // save the data 

        return res.status(200).json({success: true, message: "Account Created Succesfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: "Error in adding user"})
    }
})

// for login 


router.post('/login', async(req,res)=>{
    try {
        // access the data from body
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            // user email is not exist
            return res.status(401).json({success: false, message: "User not exist"})
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        // if password match is not equal
        if(!checkPassword){
            return res.status(401).json({success: false, message: "Incoreect password or username"})

        }
        // if correct passwrod
        // generate jwt token
        const token = jwt.sign({id: user_id} , "secretKeyNoteApp@1234", {expiresIn: "5h"})

        return res.status(200).json({success: true, token, user: {name: user.name},  message: "Login Succesfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: "Error in logging user"})
    }
})

export default router;