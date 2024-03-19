

import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'
import ApprovedDoctorModel from '../models/Doctor/ApprovedDoctorModel.js'
import Appointment from '../models/AppointmentModel.js'



export const doctorLogin = async (req, res, next) => {
    try {

        const userExist = await User.findOne({ email: req.body.email })
        if (!userExist) return next(createError(400, 'doctor not found'))
        const isDoctor = userExist.isDoctor
        if (!isDoctor) return next(createError(401, "you are not an doctor"))
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


export const setDates = async (req, res) => {
    const { doctorId, dateObj } = req.body;

    try {
        const findDoc = await ApprovedDoctorModel.findOneAndUpdate({ user: doctorId }, {
            $push: {
                BookedDates: {
                    date: dateObj.date,
                    month: dateObj.month,
                    year: dateObj.year,
                    day: dateObj.day
                }
            }
        }, { new: true })
        res.status(200).json(findDoc)
    } catch (error) {

    }
}

export const getAllDates = async (req, res) => {
    const userId = req.params.id
    try {

        const response = await ApprovedDoctorModel.findOne({ user: userId }, { BookedDates: 1 })

        res.status(200).json(response.BookedDates)
    } catch (error) {
        console.log(error);

    }
}


//deleting setdates

export const deleteDate = async (req, res) => {
    const { userId, dateObjId } = req.body
    try {
        const response = await ApprovedDoctorModel.findOneAndUpdate({ user: userId }, { $pull: { BookedDates: { _id: dateObjId } } }, { new: true })

        return res.status(200).json(response)
    } catch (error) {

    }
}

//setting time
export const setTime = async (req, res) => {

    const { bookedDateId, userId ,timeObj} = req.body
    console.log(bookedDateId);
    console.log(userId);
    try {
        const response = await ApprovedDoctorModel.findOneAndUpdate(
            { user: userId, "BookedDates._id": bookedDateId },
            { $push: { "BookedDates.$.time": {
               from:timeObj.from,
               to:timeObj.to
            } } },
            { new: true }


        )

        return res.status(200).json(response)
    } catch (error) {

    }
}


//setting time
export const deleteTime = async (req, res) => {

    const { bookedDateId, userId ,timeId} = req.body
    console.log(bookedDateId);
    console.log(userId);
    try {
        const response = await ApprovedDoctorModel.findOneAndUpdate(
            { user: userId, "BookedDates._id": bookedDateId },
            { $pull: { "BookedDates.$.time":{_id:timeId} } },
            { new: true }


        )

        return res.status(200).json(response)
    } catch (error) {

    }
}


export const pendingAppointment=async(req,res)=>{
    const {doctorId}=req.params
    console.log("parms is :"+req.params.doctorId); 
    try {
        const currentDoctor = await ApprovedDoctorModel.findOne({user:doctorId})
        const checkAppointment = await Appointment.find({doctor:currentDoctor._id});
        return res.status(200).json(checkAppointment)
    } catch (error) {
        console.log(error);
        
    }
}

export const approveAppointment =async(req,res,next)=>{
    const {apppointmentId} = req.body
    try {
        const response = await Appointment.findOneAndUpdate({_id:apppointmentId},{$set:{status:"approved"}},{new:true});
        return res.status(200).json(response)
    } catch (error) {
        next(createError(400,error))
        console.log("error");
    }
}