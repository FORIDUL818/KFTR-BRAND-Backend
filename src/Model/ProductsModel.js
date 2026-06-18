const  mongoose  = require("mongoose");
const bcrypt = require("bcrypt");
let userScimna = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            min:[2,"your firstName minimum 2 charecters"],
            max:[60,"your firstName minimum 60 charecters"]
        },
        lastName:{
            type:String,
            required:true,
            min:[2,"your firstName minimum 2 charecters"],
            max:[60,"your firstName minimum 60 charecters"]
        },
        email: {
            type:String,
            uneque:true,
            required:true,
            validate:{
               validator: function (v) {
            let  emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            return emailRegex.test(v);
            },

            message:"your email is not valid"
            }
        },

        password:{
            type:String,
            required:true,
            set: function (v) {
                return bcrypt.hashSync(bcrypt.genSaltSync(10))
            }
        },
        
    role:{
    enam:["user","admin","moderatior"],
    default:"user"
    }

    },{timeseries:true,versionKey:false} )

    let userModel= mongoose.model("Users",userScimna);
    
    module.exports = userModel;