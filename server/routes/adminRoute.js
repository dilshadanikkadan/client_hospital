import express from 'express';
import { admin_login,getAllLcense,
    verifyApplicationDoctor,sendInvoice,deleteLicense,addLicenses,getAllUsers,singleUser,pendingDoctorRequest,singlePedingDoctor,deleteUser,blockUser,unBlock} from '../controller/adminController.js';
import { verifyAdmin, verifyDoctor, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();




router.post("/admin_login",admin_login)
router.get("/get_users",verifyAdmin,getAllUsers)
router.get("/get_pendingDoctorRequest",verifyAdmin,pendingDoctorRequest)
router.get("/get_singlePedingDoctor/:doctorId",singlePedingDoctor)
router.get("/single_user/:userId",singleUser)
router.post('/block_user',verifyAdmin,blockUser)
router.post('/unblock_user',verifyAdmin,unBlock)
router.delete("/delete_user/:userId",verifyAdmin,deleteUser)
router.post('/add_licenses',verifyAdmin,addLicenses)
router.post('/delete_license',verifyAdmin,deleteLicense)
router.get('/get_allLicenses',verifyAdmin,getAllLcense)

router.post('/verifyApplicationDoctor',verifyApplicationDoctor)

// sednign invoice to admin
router.post('/send_invoice',sendInvoice)

router.get("/test",(re,res)=>{
    res.json('gey')
})

export default router;