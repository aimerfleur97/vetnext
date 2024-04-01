import express from 'express'
import { SlotController } from '../controllers/slot.controller.js'

const router = express.Router()


router.post('/generateSlots', SlotController.Generate) // Generate Slots
router.get('/getslots/:doctorId', SlotController.getSlots) // Get Slots with sortes
router.delete('/deleteslot/:slotId', SlotController.deleteSlot)


// router.use(AuthController.verifyJwtToken)
export default router