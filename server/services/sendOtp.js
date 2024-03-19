import Otp from "../models/otpModel.js"
import { createError } from "../utils/error.js"
import { sendEmail } from "./sendEmail.js";
import bcrypt, { hash } from "bcrypt"


//genrating a four digit otp  num
const otpGearator = async () => {
    let OTP;
    try {
        OTP = Math.floor(1000 + Math.random() * 9000)
        return OTP
    } catch (error) {
        throw error

    }
}

//sending otp with email
export const sendOtp = async ({ username, password, email, subject, message, duration = 30 }) => {
    if (!(email && subject && username && password && message)) {
        createError(401, "invalid credential")
    }
    try {
        await Otp.deleteOne({ email })


        //generrate otp from function
        const otp = await otpGearator()

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject,
            html: `<p> ${message}</p> <p style="color:tomato; font-size:25px; letter-spacing:2px;">
            <b>${otp}</b>
            </p>
            expires in 
            <p>${duration} seconds</p>
            `
        }
        await sendEmail(mailOptions)
        const salt = await bcrypt.genSalt(10)
        const hashedOtp = await bcrypt.hash(otp.toString(), salt)
        const newOtp = await new Otp({
            username,

            email,
            password,
            otp: hashedOtp,
            createdAt: Date.now(),
            expirest: Date.now() + 50000
        }) 
        await newOtp.save()


        //deleting the otp with in a time period
        setTimeout(async () => {
            await Otp.deleteOne({ email });
            console.log("OTP deleted after expiration time");
        }, 50000);
        return newOtp

    } catch (error) {
        throw error

    }

}


export const sendOtpForgot = async ({ username, password, email, subject, message, duration = 30 }) => {
    if (!(email && subject  && message)) {
        createError(401, "invalid credential")
    }
    try {
        await Otp.deleteOne({ email })


        //generrate otp from function
        const otp = await otpGearator()

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject,
            html: `<p> ${message}</p> <p style="color:tomato; font-size:25px; letter-spacing:2px;">
            <b>${otp}</b>
            </p>
            expires in 
            <p>${duration} seconds</p>
            `
        }
        await sendEmail(mailOptions)
        const salt = await bcrypt.genSalt(10)
        const hashedOtp = await bcrypt.hash(otp.toString(), salt)
        const newOtp = await new Otp({
            username,

            email,
            password,
            otp: hashedOtp,
            createdAt: Date.now(),
            expirest: Date.now() + 50000
        }) 
        await newOtp.save()


        //deleting the otp with in a time period
        setTimeout(async () => {
            await Otp.deleteOne({ email });
            console.log("OTP deleted after expiration time");
        }, 50000);
        return newOtp

    } catch (error) {
        throw error

    } 

}

export const sendAutoEmailDoctor = async ({ email ,subject,message ,name}) => {
    if (!(email && subject  && message)) {
        createError(401, "invalid credential")
    }
    try {


   

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject,
            html: 

            `
            <div style="max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ffffff;">
            <h3 style="color: #333; margin-bottom: 20px;">Thank You for Your Application ${name} </h3>
            <p style="font-size: 16px; line-height: 24px; color: #333;">This is an auto-generated email to acknowledge receipt of your application. We appreciate your interest in our service. Rest assured, we will review your application carefully. We will be in touch with you soon to discuss the next steps.</p>
            <p style="font-size: 16px; line-height: 24px; color: #333; margin-top: 20px;">Another word from you is eagerly awaited!</p>
          </div>
            `
        }
        await sendEmail(mailOptions)
     


        return {success:true}

    } catch (error) {
        throw error

    } 

}