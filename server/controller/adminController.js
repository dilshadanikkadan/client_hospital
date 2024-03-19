import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'
import DoctorApplication from '../models/doctorApplicationModel.js'
import LicenseShema from '../models/licenseModel.js'
import NotificationRoom from '../models/socket/notificationRoom.js'
import InvoiceSchema from '../models/admin/invoiceModel.js'
import easyinvoice from 'easyinvoice';
import { dataPdf } from '../utils/pdfData.js'
import cloudinary from "cloudinary"
import fs from "fs"
import ApprovedDoctorModel from '../models/Doctor/ApprovedDoctorModel.js'
//config
cloudinary.v2.config({
    cloud_name: 'dvqq5x5x6',
    api_key: '932164867446553',
    api_secret: 'gpdHLgWcdIRU4W2GdZ_UTQr_Np8'


})


//login admin
export const admin_login = async (req, res, next) => {
    try {

        const userExist = await User.findOne({ email: req.body.email })
        if (!userExist) return next(createError(400, 'admin not found'))
        const isAdmin = userExist.isAdmin
        if (!isAdmin) return next(createError(401, "you are not an admin"))
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

//gett all users 
export const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find({ isAdmin: { $ne: true } }, { password: 0 })


        return res.status(200).json(allUsers)
    } catch (error) {
        console.log(error);
    }
}


//gte signle user
export const singleUser = async (req, res, next) => {
    if (req.params.userId === "undefined") {
        console.log(" params id is " + req.params.userId);
        return next(createError(400, "no id here"))
    }
    const userId = req.params.userId
    try {
        const singleuser = await User.findById(userId, { password: 0 })
        return res.status(200).json(singleuser)
    } catch (error) {
        console.log(next(createError(401, error)));
        console.log(error);
    }
}

//get all pending requests 

export const pendingDoctorRequest = async (req, res) => {
    try {
        const allPendingRequest = await DoctorApplication.find()


        return res.status(200).json(allPendingRequest)
    } catch (error) {
        console.log(error);

    }
}

//get single pending doctor

export const singlePedingDoctor = async (req, res) => {
    try {
        const doctorId = req.params.doctorId
        const singledoctor = await DoctorApplication.findById(doctorId)

        return res.status(200).json(singledoctor)
    } catch (error) {
        console.log(error);

    }
}


//delete  single User

export const deleteUser = async (req, res) => {
    const userId = req.params.userId
    try {
        const deleteuser = await User.findByIdAndDelete(userId)
        return res.status(200).json("delted user successsfully")
    } catch (error) {
        console.log(error);
    }
}

// block user
export const blockUser = async (req, res) => {
    const { email } = req.body
    try {
        const update = await User.findOneAndUpdate({ email }, { $set: { status: "blocked" } });
        return res.status(200).json("blocked successfully")
    } catch (error) {
        console.log(error);

    }
}

// unBlock user
export const unBlock = async (req, res) => {
    const { email } = req.body
    try {
        const update = await User.findOneAndUpdate({ email }, { $set: { status: "active" } });

        console.log(update);
        return res.status(200).json("unblocked successfully")
    } catch (error) {
        console.log(error);

    }
}


//license adding

export const addLicenses = async (req, res) => {
    const { licenseNo } = req.body
    let id = "65eab6d166a0b15572caaf33"
    try {
        const lisenceAdding = await LicenseShema.updateOne({ _id: id }, { $addToSet: { licenses: licenseNo } }, { new: true })

        if (lisenceAdding.modifiedCount === 0) {
            res.status(200).json('License already exists in the array.');
        } else {
            res.status(200).json('License added to the array.');
        }
    } catch (error) {
        console.log(error);
    }
}


//delteLicesnce

export const deleteLicense = async (req, res) => {
    const { licenseNo } = req.body;
    let id = "65eab6d166a0b15572caaf33"

    try {
        const response = await LicenseShema.updateOne({ _id: id }, { $pull: { licenses: licenseNo } }, { new: true })
        return res.json(200).json(response)
    } catch (error) {

    }
}

export const getAllLcense = async (req, res) => {
    let id = "65eab6d166a0b15572caaf33"

    try {
        const response = await LicenseShema.findById(id)
        return res.status(200).json(response.licenses)
    } catch (error) {

    }
}


//sendinvice

export const sendInvoice = async (req, res) => {
    const { message, typeOfMessage, subject, name, invoice, unRead, recieverId } = req.body;


    try {

        easyinvoice.createInvoice(dataPdf, async function (result) {

            try {
                const response = await cloudinary.v2.uploader.upload(`data:application/pdf;base64,${result.pdf}`, {
                    resource_type: 'image',
                    folder: 'application'
                });
                let url = response.secure_url
                url?.replace(".pdf", ".jpg")
                console.log('PDF uploaded successfully:', url?.replace(".pdf", ".jpg"));

                const newInvoice = new InvoiceSchema({
                    recieverId,
                    message,
                    typeOfMessage,
                    invoice: url?.replace(".pdf", ".jpg"),
                    unRead,
                    subject,
                    name

                })
                const saved = await newInvoice.save()
                const updatStatus = await DoctorApplication.updateOne({ user: recieverId }, { $set: { status: "payment" } }, { new: true })
                console.log(updatStatus);
                return res.status(200).json(saved)
            } catch (error) {
                console.error('Error uploading PDF to Cloudinary:', error)
            }
        });


    } catch (error) {
        console.log(error);
    }
}


export const verifyApplicationDoctor = async (req, res, next) => {
    const { userId } = req.body

    try {
        const current = await DoctorApplication.findOne({ user: userId })
        const UpdateDoc = await User.findOneAndUpdate({ _id: userId }, { $set: { isDoctor: true, role: "doctor" } }, { new: true })
        const updateApplcation = await DoctorApplication.updateOne({ user: userId }, { $set: { verification: "true" } }, { new: true })
        const updateSatatus = await InvoiceSchema.updateOne({ recieverId: userId }, { $set: { verification: "true" } }, { new: true })


        //adding doctor in approved schema
            const newApprovedSchema = new ApprovedDoctorModel({
                user: userId,
                firstname: current.firstname,
                lastname: current.lastname,
                email: current.email,
                speciality: current.speciality,
                phoneNo: current.phoneNo,
                qualification: current.qualification,
                profileImage: current.profileImage,
                licenseNo:"MA3312"
            })

            await newApprovedSchema.save()

        return res.status(200).json("successfully done")
    } catch (error) {
        next(createError(400, error))
    }
}