import mongoose from "mongoose"

const dateSchema = new mongoose.Schema({
    date: { type: String ,default:"null"},
    day: { type: String},
    month: { type: String},
    year: { type: String},
    time: [{
        from: { type: String },
        to: { type: String },
        status:{
            type:String,
            default:"pending"
        }
    }]
});

const approvedDoctorModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
       
    },
    licenseNo: {
        type: String,
        default:"null"
        
    },  
    status: {
        type: String,
        default: "active"
    },
    phoneNo: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    availbaleDates: {
        type: [],

    },
    BookedDates: {
        type: [dateSchema]

    }

}, { timestamps: true })

const ApprovedDoctorModel = mongoose.model('approvedList', approvedDoctorModel)


export default ApprovedDoctorModel