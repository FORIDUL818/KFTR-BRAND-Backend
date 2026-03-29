import userModel from "../Model/UserModel.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";   
import OtpModel from "../Model/OtpModel.js";
import SendEmailUtility from "../Utility/SendMailUtility.js";
// user register controller
export const userRegister   = async (req,res) => {
    try {
        
        let existUser = await userModel.findOne({email:req.body.email});

        if(existUser){
            return res.status(400).json({message:"email already exist"});
        }

        const {firstName,lastName,email,password} = req.body;
       
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({message:"all fields are required"});
        }

        let newUser = new userModel({firstName,lastName,email,password});
           newUser.save();
       

          res.status(200).json({message:"user created successfully",user:newUser});
 

    } catch (err) {
        res.status(500).json({message:err.message});
    }
}
// user register controller end

export const userLogin = async (req,res) => {
    try {
        
        let {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"all fields are required"});
        }


        let existUser = await userModel.findOne({email});
         console.log(existUser.email);
        if(!existUser){
            return res.status(400).json({message:"user not found"});
        }
        let isPasswordCorrect = bcrypt.compareSync(password,existUser.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message:"invalid password"});
        }
        let token = jwt.sign({ email: existUser.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ status: "success", data: existUser, token: token });
    } catch (err) {
        res.status(500).json({message:err.message});
    }
}

export const userProfileUpdate = async function(req, res) {
    try {

       let email = req.headers.email;

        let user = await userModel.findOneAndUpdate({ email: email }, req.body, { new: true });
        if (!user) {
            return res.status(200).json({ status: "fail", message: "User not found" });
        }
        res.status(200).json({ status: "success", data: user });


    } catch (err) {
        res.status(200).json({status: "fail", message: err.message});
    }
}



export const userProfileDelete = async (req,res) => {
    try {
        let email = req.headers.email;
        let existUser = await userModel.findOne({email});

        if(!existUser){
            return res.status(400).json({message:"user not found"});
        }
        await userModel.findByIdAndDelete({_id:existUser._id});
        res.status(200).json({message:"user deleted successfully"});
    } catch (err) {
        res.status(500).json({message:err.message});
    }
}

export const profileDetails = async (req,res) => {
    try {
        let email = req.headers.email;
        let existUser = await userModel.findOne({email});

        if(!existUser){
            return res.status(400).json({message:"user not found"});
        }
        res.status(200).json({message:"user details",data:existUser});
    } catch (err) {
        res.status(500).json({message:err.message});
    }
}

// profileDetails end

// RecoverVaryfyEmail start
export const RecoverVerifyEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        // Create a new entry in the OtpModel to store the OTP
        const createdOtp = await OtpModel.create({ email, otp, status: 0 });

        // Send the OTP via email
        const sendMailResult = await SendEmailUtility(email, `Your OTP for account recovery: ${otp}`, "Account Recovery OTP");

        return res.status(200).json({
            status: "success",
            message: "OTP sent successfully",
            sendMailResult: sendMailResult
        });
    } catch (err) {
        res.status(500).json({ status: "fail", message: err.message });
    }
};
// RecoverVaryfyEmail end 


// OTP Verification start
export const OtpVerification = async (req, res) => {
    try {
        const email = req.params.email;
        const otp = req.params.otp;

        const otpCheck = await OtpModel.findOne({ email, otp, status: 0 });

        if (otpCheck) {
            await OtpModel.updateOne({ email, otp }, { status: 1 });
            return res.status(200).json({ status: "success", message: "OTP verified successfully" });
        } else {
            return res.status(400).json({ status: "fail", message: "Invalid or expired OTP" });
        }
    } catch (err) {
        return res.status(500).json({ status: "fail", message: err.message });
    }
};
// OTP Verification end

// reset password start
export const passwordReset = async (req, res) => {
    let email = req.body.email;
    let otp = req.body.otp;
    let newPassword = req.body.password;

    try {
        let otpCheck = await OtpModel.findOne({ email: email, otp: otp, status: 1 });

        if (otpCheck) {
            let updatePassword = await userModel.updateOne({ email: email }, { password: newPassword });
            await OtpModel.deleteMany({ email: email }); // Clean up used OTPs
            res.status(200).json({ status: "success", message: "Password reset successfully" });
        } else {
            res.status(400).json({ status: "fail", message: "Invalid or expired OTP" });
        }
    } catch (err) {
        res.status(500).json({ status: "fail", message: err.message });
    }
}
// reset password end