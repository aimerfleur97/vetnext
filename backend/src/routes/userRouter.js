import express from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import { ProfileController } from "../controllers/profile.controller.js"
// import { UserController } from '../controller/user.controller'

const router = express.Router()


router.post('/signup', AuthController.signUp) // New registration
router.post('/signIn', AuthController.signIn) // Normal login with email and password

// USer Profile

router.put('/profile/:userId', ProfileController.Update) // Normal login with email and password
router.get('/profile/get/:userId', ProfileController.Get)


// router.use(AuthController.verifyJwtToken)
export default router