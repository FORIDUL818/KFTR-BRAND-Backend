import nodemailer from "nodemailer";

const SendEmailUtility = async (emailTo, emailText, emailSubject) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM || "Stock Rocket <noreply@stockrocket.com>",
            to: emailTo,
            subject: emailSubject,
            text: emailText,
        };

        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Email sending error:", error);
        throw error;
    }
};

export default SendEmailUtility;
