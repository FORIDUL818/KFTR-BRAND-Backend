import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    status: { type: Number, default: 0 } // 0 for not verified, 1 for verified
});

export default mongoose.model("Otp", otpSchema);
