import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'approvedList',
        required: true
    },

    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },
    time: {
        from: { type: String, required: true },
        to: { type: String, required: true },
        id: String
    },
    month: {
        type: String,
        required: true
    },


    reason: String,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    bookedId: String,
    doctorListId:String

}, {
    timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment
