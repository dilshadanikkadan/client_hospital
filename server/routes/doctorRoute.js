import express from 'express';

import { verifyAdmin, verifyDoctor, verifyToken, verifyUser } from '../utils/verifyToken.js';
import { doctorLogin,approveAppointment,pendingAppointment,deleteTime,setDates,getAllDates,deleteDate ,setTime} from '../controller/doctorController.js';

const router = express.Router();




router.post("/doctor_login",doctorLogin)
router.post('/setdates',setDates)
router.get('/get_Alldates/:id',getAllDates)
router.post('/delete_date',deleteDate)
router.post('/add_time',setTime)
router.post('/delete_time',deleteTime)
router.get('/get_pendingAppointment/:doctorId',pendingAppointment)
router.post('/approve_appointment',approveAppointment)


export default router;