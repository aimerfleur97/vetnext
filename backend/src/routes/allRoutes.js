import express from "express"
import userRouter from "./userRouter.js"
import doctorRouter from "./doctorRoutes.js"
import appoinmentRouter from "./appointmentRouter.js"
import slotsRouter from "./slotsRouter.js"


const router = express.Router()

router.use("/user", userRouter)
router.use("/doctor", doctorRouter)
router.use("/appointment", appoinmentRouter)
router.use("/slots", slotsRouter)


export default router