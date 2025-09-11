import jwt from "jsonwebtoken";
import User from "../models/User.js";

// middleware to check if the user is valid or not
const middleware = async (req , res , next) =>{
    try {
        // to verify the user we will check the token
        const token = req.headers.authorization.split(' ')[1]; // home.jsx me header me token bnaya h. To after break the token we take the first one which is the actual token generated
        if(!token){
            return res.status(401).json({success: false, message: "Unauthorized"});
        }

        // now yaha tk aaye mean stoken is valid so now we can go forward
        // so we want user id which is present in  PAYLOAD
        const decoded = jwt.verify(token, "secretKeyNoteApp@1234");

        if(!decoded){
            return res.status(401).json({success: false, message: "WRONG TOKEN"});
        }

        const user = await User.findById({_id: decoded.id});

        // now check if we get user or not
        if(!user){
            return res.status(404).json({success: false, message: "user not found"});
        }

        const newUser = {name: user.name , id: user._id};
        req.user = user.name
        next(); // move back to where I want to go
    } catch (error) {
        
    }
}

export default middleware