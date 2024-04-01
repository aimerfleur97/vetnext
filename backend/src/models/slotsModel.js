// doctorModel.js
import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  date: Date,
  slot: [
    {
      start: String,
      end: String,
      booked: Boolean,
      appointmentType: { type: String, enum: ['online', 'offline'] }
    },
  ],
  startAt: String,
  endAt: String,
  duration: Number,
  rate: Number,
  currency: String
});

const slotsModel = mongoose.model("Slots", slotSchema);

export default slotsModel;
