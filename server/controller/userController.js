import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'
import { sendAutoEmailDoctor, sendOtp, sendOtpForgot } from '../services/sendOtp.js'
import Otp from '../models/otpModel.js'
import { validationResult } from 'express-validator'
import DoctorApplication from '../models/doctorApplicationModel.js'
import LicenseShema from '../models/licenseModel.js'
import InvoiceSchema from '../models/admin/invoiceModel.js'
import Razorpay from 'razorpay';
import crypto from "crypto"
import ApprovedDoctorModel from '../models/Doctor/ApprovedDoctorModel.js'
import Appointment from '../models/AppointmentModel.js'


//register
export const SignUp = async (req, res, next) => {
    let newmessage = "please verify your email"
    let subject = "e-care"
    let message;


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        message = errors.array()[0].msg
        return next(createError(402, message))
    }

    //check email already exist
    const isEmail = await User.countDocuments({ email: req.body.email })
    if (isEmail > 0) {
        message = "email already exist"
        return next(createError(402, message))
    }


    const salt = await bcrypt.genSalt(10);

    // Hash password using generated salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    try {
        const createdOtp = sendOtp({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            message: newmessage,
            subject
        })

        res.status(200).json("done that god")
    } catch (error) {
        next(error)
    }
}


//verifying email with otp
export const verifyEmail = async (req, res, next) => {
    const { email, otp } = req.body;

    try {
        const CheckUser = await Otp.findOne({ email })
        if (!CheckUser) return next(createError(401, "user not Found"));
        const isMatch = await bcrypt.compare(otp.toString(), CheckUser.otp)
        if (isMatch) {
            const newUser = new User({
                username: CheckUser.username,
                email: CheckUser.email,
                password: CheckUser.password,

            })

            const token = jwt.sign({ id: newUser._id, role: newUser.role, isAdmin: newUser.isAdmin, isDoctor: newUser.isDoctor },
                process.env.JWT_SECRET, { expiresIn: 360000 },)
            const user = await newUser.save()
            res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
            return res.status(200).json(token)
        } else return next(createError(402, "inavlid otp"))
    } catch (error) {

    }
}

//send otp 
export const forgot_password = async (req, res, next) => {
    let message = "please verify your email"
    let subject = "e-care"

    try {
        const ischeckEmail = await User.findOne({ email: req.body.email })
        if (!ischeckEmail) return next(createError(400, "Email not Found"))
        const createdOtp = sendOtpForgot({
            email: req.body.email,
            message,
            subject
        })
        return res.status(200).json("email has been sent")
    } catch (error) {
        console.log(error);
    }
}



//login
export const login = async (req, res, next) => {
    try {

        const userExist = await User.findOne({ email: req.body.email })
        if (!userExist) return next(createError(400, 'User not found'))
        const isActive = userExist.status === "active"
        if (!isActive) return next(createError(400, "You Are Blocked By Admin"))
        const validPassword = await bcrypt.compare(req.body.password, userExist.password)
        if (!validPassword) return next(createError(400, 'Invalid password'))
        const token = jwt.sign({ id: userExist._id, role: userExist.role, isAdmin: userExist.isAdmin, isDoctor: userExist.isDoctor },
            process.env.JWT_SECRET, { expiresIn: 360000 },)
        res.cookie('token', token, { httpOnly: true })
        res.status(200).json({
            userExist,
            token
        })

    } catch (error) {
        next(error)

    }

}


//logout
export const logout = async (req, res, next) => {
    try {
        res.clearCookie('token')
        res.status(200).json({ msg: 'Logged out' })
    } catch (error) {
        next(error)
    }
}


//verify fogot password otp 
export const verifyForgotOtp = async (req, res, next) => {
    const { email, otp } = req.body;

    try {
        const CheckUser = await Otp.findOne({ email })
        if (!CheckUser) return next(createError(401, "user not Found"));
        const isMatch = await bcrypt.compare(otp.toString(), CheckUser.otp)
        if (isMatch) {

            return res.status(200).json("email verified successfully")
        } else return next(createError(402, "inavlid otp"))
    } catch (error) {

    }
}


//reset password
export const resetPassword = async (req, res, next) => {
    const { email, password } = req.body
    try {
        // console.log(req.user.id);

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const resetPassword = await User.findOneAndUpdate({ email }, {
            $set: {
                password: hashedPassword
            }
        }, { new: true })
        res.status(200).json("updated sucessfully ")
    } catch (error) {
        next(error)

    }
}

export const chekLicenseIsValid = async (req, res, next) => {
    let id = "65eab6d166a0b15572caaf33"
    const { licenseNo } = req.body
    try {
        //cheking this is valid licenseNO or not
        const response = await LicenseShema.findById(id, { licenses: { $elemMatch: { $in: [licenseNo, "dummy"] } } });
        if (response.licenses.length === 0) return next(createError(400, "This Is Not Valid Licence NO"))
        return res.status(200).json("this is valid numner")
    } catch (error) {
        console.log(error);
    }
}

//apply for doctor application

export const applyDoctorApplication = async (req, res) => {

    try {
        const { firstname, lastname, email, licenseNo, phoneNo,
            qualification, licenseImage, hospital, speciality, profileImage, user } = req.body


        const newApplicationSchema = new DoctorApplication({
            user,
            firstname,
            lastname,
            email,
            licenseImage,
            licenseNo,
            phoneNo,
            qualification,
            hospital,
            speciality,
            profileImage
        })

        const sendEmail = sendAutoEmailDoctor({
            message: 'E-care',
            email,
            subject: 'E-care',
            name: lastname
        })

        const saved = await newApplicationSchema.save()

        return res.status(200).json(saved)
    } catch (error) {
        console.log(error);

    }
}


//check user is aplllied or not 

export const checkApplied = async (req, res) => {
    const userId = req.params.userId
    try {
        const available = await DoctorApplication.findOne({ user: userId }).countDocuments()
        return res.status(200).json(available)
    } catch (error) {

    }
}

// get all notification 

export const allNotification = async (req, res, next) => {
    console.log(req.params.id);
    if (req.params.id === "undefined") {
        return next(createError(400, "no id here"))
    }
    const checkId = req.params.id
    try {
        const notification = await InvoiceSchema.findOne({ recieverId: checkId })

        return res.status(200).json(notification)
    } catch (error) {
        console.log(error);
    }
}

export const makePaymentDcotor = async (req, res, next) => {
    try {
        const razorpay = new Razorpay({
            key_id: "rzp_test_y12CU0IJofELhC",
            key_secret: "o43nfduaDsXdAutXOQC5rIGt"
        });
        console.log("we reached here");

        const options = req.body;
        const payment = await razorpay.orders.create(options);

        if (!payment) {
            return next(createError(500, "Failed to create payment"));
        }

        res.status(200).json(payment);
    } catch (error) {
        if (error.statusCode === 401) {
            return next(createError(401, "Authentication error: Invalid API key or secret"));
        }
        console.error("Razorpay error:", error);
        return next(createError(500, "Internal server error"));
    }
};

export const makePaymentDcotorValidate = async (req, res, next) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, userId } = req.body;
    try {
        const sha = crypto.createHmac("sha256", "o43nfduaDsXdAutXOQC5rIGt");
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = sha.digest("hex");
        if (digest !== razorpay_signature) {
            return res.status(400).json("not valid your payment");
        }
        const updateSatatus = await InvoiceSchema.updateOne({ recieverId: userId }, { $set: { status: "success" } }, { new: true })
        const updatStatus = await DoctorApplication.updateOne({ user: userId }, { $set: { status: "suscess" } }, { new: true })
        return res.status(200).json({
            msg: "payment successfully completed",
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id
        });
    } catch (error) {

        console.error("Error validating payment:", error);
        return res.status(500).json("An error occurred while validating payment");
    }
};


export const getAllDoctor = async (req, res) => {
    try {
        const response = await ApprovedDoctorModel.find()

        res.status(200).json(response)
    } catch (error) {
        console.log(error);
    }
}


export const bookAppointment = async (req, res) => {

    const { patient, doctor, doctorListId, bookedId, phoneNo, lastname, firstname, email, date, time, month, reason } = req.body
    try {
        const newAppintmentSchema = new Appointment({
            patient,
            doctor,
            date,
            time,
            month,
            reason,
            phoneNo,
            email,
            firstname,
            lastname,
            bookedId,
            doctorListId


        })

        console.log("time id :" + time.id);
        console.log("bookedId :" + bookedId);
        console.log("doctor :" + doctor);


        const updateStatus = await ApprovedDoctorModel.updateOne(
            {
                user: doctorListId,
                "BookedDates._id": bookedId,
                "BookedDates.time._id": time.id
            },
            {
                $set: {
                    "BookedDates.$[outerElem].time.$[innerElem].status": "success"
                }
            },
            {
                arrayFilters: [
                    { "outerElem._id": bookedId },
                    { "innerElem._id": time.id }
                ],
                new: true
            }
        );


        const saved = await newAppintmentSchema.save()
        res.status(200).json(updateStatus)
    } catch (error) {
        console.log(error);
    }
}

export const viewAppointment = async (req, res) => {
    const patientId = req.params.id
    try {
        const response = await Appointment.findOne({ $or: [{ patient: patientId }, { _id: patientId }] }).populate('doctor');

        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
    }
}


export const cancelAppointment= async (req, res) => {
    const { appointmentId, timeId, doctorListId, bookedId } = req.body
    try {
        const response = await Appointment.findByIdAndDelete(appointmentId);
        const updateStatus = await ApprovedDoctorModel.updateOne(
            {
                user: doctorListId,
                "BookedDates._id": bookedId,
                "BookedDates.time._id": timeId
            },
            {
                $set: {
                    "BookedDates.$[outerElem].time.$[innerElem].status": "pending"
                }
            },
            {
                arrayFilters: [
                    { "outerElem._id": bookedId },
                    { "innerElem._id": timeId }
                ],
                new: true
            }
        );

        return res.status(200).json("deleted sucess fully")
    } catch (error) {
        console.log(error);
    }
}

export  const viewSingleDoctor =async(req,res)=>{
    const doctodId = req.params.id
    console.log("doctor id :"+doctodId);
    try {
        const response = await ApprovedDoctorModel.findOne({_id : doctodId});
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
    }
}