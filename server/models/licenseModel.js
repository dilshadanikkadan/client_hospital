import mongoose from "mongoose";

const licenseShema = mongoose.Schema({
    licenses:{
        type:[]
    }
})

const LicenseShema = mongoose.model("licenses",licenseShema)

export default LicenseShema