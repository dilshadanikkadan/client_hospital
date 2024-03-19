import express from 'express';
import { SignUp, viewSingleDoctor, cancelAppointment,viewAppointment,bookAppointment,getAllDoctor,verifyEmail, makePaymentDcotorValidate,makePaymentDcotor,allNotification,chekLicenseIsValid,forgot_password, login, resetPassword, logout ,checkApplied,verifyForgotOtp,applyDoctorApplication} from '../controller/userController.js';
import { verifyAdmin,verifyDoctor, verifyToken, verifyUser } from '../utils/verifyToken.js';
import { SuccessMsg } from '../utils/sucess.js';
import { validateSignup } from '../middlewires/signUpvalidate.js';
import { loginValidation } from '../middlewires/loginValidation.js';
const router = express.Router();

//post routes from users 
router.post('/SignUp',validateSignup, SignUp)  
router.post('/login',loginValidation, login)
router.post('/logout',logout)
router.post('/verify_email', verifyEmail)
router.post('/forgot_password', forgot_password)
router.post('/resetPassword', resetPassword)
router.post('/verifyForgotOtp',verifyForgotOtp)
router.post('/apply_doctorApplication',verifyUser,applyDoctorApplication)
router.post('/chek_licenseIsValid',verifyUser,chekLicenseIsValid) 


//make payment
router.post('/order',makePaymentDcotor)
router.post('/order/validate',makePaymentDcotorValidate)

router.get("/checkApplied/:userId",checkApplied) 
router.get('/get_allNotification/:id',allNotification)
router.get("/get_allDoctor",getAllDoctor)
router.post('/make_appointment',bookAppointment)
router.get('/view_appointment/:id',viewAppointment)
router.post('/cancel_Appointment',cancelAppointment)
router.get('/view_doctor/:id',viewSingleDoctor)



router.get("/check",  (req, res, next) => {
    res.cookie('token',"dilshad");
    const token = req.cookies.token;
    return res.json(token)
}) 
export default router;