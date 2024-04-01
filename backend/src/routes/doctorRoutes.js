import express from 'express'
import { DoctorController } from '../controllers/doctor.controller.js'

const router = express.Router()

router.post('/create', DoctorController.Create) // New registration
router.get('/details/:doctorId', DoctorController.Details) // New registration
router.put('/update/:doctorId', DoctorController.Update) // New registration
router.get('/all', DoctorController.AllDoctors)
router.delete('/delete/:doctorId', DoctorController.Delete)
router.post('/signin', DoctorController.SignIn)



// router.use(AuthController.verifyJwtToken)
export default router