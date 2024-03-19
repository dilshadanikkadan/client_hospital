import mongoose from "mongoose"


const doctorApplicationSchema=mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        unique:true
      },
      firstname:{
        type:String,
        required:true
      },
      lastname:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true
      },
      speciality: {
        type: String,
        required: true
      },
      hospital: {
        type: String,
        // required: true
      },
      licenseNo: {
        type: String,
      },
      status:{
        type:String, 
        default:"pending"
      },
      phoneNo: {
        type: String,
        required: true,
      },
      qualification:{
        type:String,
        required:true
      },
      profileImage:{
        type:String,
        required:true
      },
        
      licenseImage:{
        type:String,
        required:true
      },
      verification:{
        type: String,
        default: "false",
      }
     

})

const DoctorApplication = mongoose.model('doctorApplication',doctorApplicationSchema)


export default DoctorApplication