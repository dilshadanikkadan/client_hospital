import nodemailer from "nodemailer"


let transporter =nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
        user: "pedri33123312@gmail.com",
        pass: "rgwp lehu mtnk ldmq",
      },  
})

 
transporter.verify((error,sucess)=>{
    if(error){
        console.log(error);
    }else{
        console.log("ready to message"+sucess);
    }
})

export const sendEmail = async (mailOptions)=>{ 
    try {
        await transporter.sendMail(mailOptions);
        return;
        
    } catch (error) {
        throw error
        
    }
}