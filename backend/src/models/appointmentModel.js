// doctorModel.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patientName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  appointmentDate: {
    type: Date,
    // required: true,
  },
  appointmentTime: {
    type: String,
    // required: true,
  },
  slotId: {
    type: Object,
    ref: "Slots",
    required: true,
  },
});

const appointmentModel = mongoose.model("Appointment", appointmentSchema);

export default appointmentModel;
