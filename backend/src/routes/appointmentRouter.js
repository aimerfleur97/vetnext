import express from 'express'
import { AppointmentController } from '../controllers/apponitment.controller.js'

const router = express.Router()


router.post('/create', AppointmentController.Create) // New registration
router.get('/get/:doctorId', AppointmentController.Get) // New registration


// router.use(AuthController.verifyJwtToken)
export default router