import mongoose, { mongo } from "mongoose";


const invoiceSchema = mongoose.Schema({
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        default: 'Approval Letter'

    },
    typeOfMessage: {
        type: String,
        default: "invoice"
    },
    invoice: {
        type: String,
        required: true
    },

    payment: {
        type: String,
        default: "20000"
    },
    paymentMsg: {
        type: String,
        default: "As part of the next steps, kindly proceed with the payment process for  the services you'll be providing. Below are the details for your convenience"


    },
    unRead: {
        type: Boolean,
        default: true,

    },

    companyName: {
        type: String,
        default: "E-care",

    },

    status: {
        type: String,
        dafault: "pending"
    },

    verification:{
       type:String,
       dafault:"false"
    },
    Postion: {
        type: String,
        default: "Manager",

    },

}, { timestamps: true })

const InvoiceSchema = mongoose.model("invoiceModel", invoiceSchema)

export default InvoiceSchema