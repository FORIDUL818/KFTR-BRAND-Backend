import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchima = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxLength:["maximum text size is 60"],
        minLength:["minimum text size is 2"]
    },
    lastName:{
        type:String,
        required:true,
        maxLength:["maximum text size is 60"],
        minLength:["minimum text size is 2"]
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate:{
            validator:(v)=>{
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                return emailRegex.test(v);
            },
            message:"email is not correted"
        }
    },
    password:{
        type:String,
        required:true,
        set:(v)=>{
            return bcrypt.hashSync(v,bcrypt.genSaltSync(10));
        }

    },
    role:{
        enum:["user","admin","modarator","premeumUser"];
        default:"user",
        type:String,
    }

},{versionKey:false,timestamps:true});

let userModel = mongoose.model("users",userSchima);

export default userModel;