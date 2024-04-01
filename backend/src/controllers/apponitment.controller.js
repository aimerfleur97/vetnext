import catchAsync from "../utils/catchAsync.js";
import appoinmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import Slot from "../models/slotsModel.js";
import AppError from "../utils/appError.js";
import { sendSuccessResponse } from "../utils/helperFunctions.js";
import { appointmentValidation } from "../utils/validations/appointment.validation.js";
import {sendEmailToUser, sendEmailToDoctor} from "../utils/email/page.js"

export class AppointmentController {
  static Create = catchAsync(async (req, res, next) => {
    try {
      const validate = await appointmentValidation(req.body);
      if (!validate.status) {
        return next(
          new AppError(
            validate.error ||
            "Oops! The provided parameters are invalid. Please check your input and try again.",
            400
          )
        );
      }
      const { doctorId, patientName, slotId } = req.body;

      // Check if the doctor exists
      const doctor = await doctorModel.findById(doctorId);
      if (!doctor) {
        next(new AppError("Oops! Doctor not found", 400));
      }
      const slot = await Slot.findOne({
        doctorId,
        slot: {
          $elemMatch: {
            _id: slotId,
            booked: false,
          },
        },
      }, {
        'slot.$': 1, // Projection to return only the first matched element from the array
        date: 1,
      });
      if (!slot) {
        return next(
          new AppError("Appointment slot not available.", 400)
        );
      }

      const userData = await userModel.findById({_id: patientName})
      const doctorName = doctor?.first_name + " " + doctor?.last_name
      const UserName = userData.first_name + " " + userData.last_name
      const BookedDate = new Date(slot.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const TimeStart = slot.slot[0].start
      const TimeEnd = slot.slot[0].end
      const sendUserEmail = await sendEmailToUser(userData?.email, UserName, doctorName, BookedDate, TimeStart, TimeEnd)
      const sendDoctorEmail = await sendEmailToDoctor(doctor?.email, doctorName, UserName, BookedDate, TimeStart, TimeEnd)

      const newAppointment = new appoinmentModel({
        doctor: doctorId,
        patientName,
        slotId: slot.slot[0],
      });

      // Save the new appointment to the database
      await newAppointment.save();

      // Update the booked status of the slot in the slots model
      await Slot.updateOne(
        {
          _id: slot._id,
          "slot._id": slotId,
        },
        {
          $set: { "slot.$.booked": true },
        }
      );

      return sendSuccessResponse(
        res,
        newAppointment,
        200,
        "Congratulations! Appointment created successfully."
      );
    } catch (error) {
      return next(
        new AppError(error || error.message || "Internal server error", 500)
      );
    }
  });

  static Get = catchAsync(async (req, res, next) => {
    try {
      const { doctorId } = req.params;

      // Check if the doctor exists
      const doctor = await doctorModel.findById(doctorId);
      if (!doctor) {
        return next(
          new AppError("Doctor not found", 400)
        );
      }

      // Retrieve all appointments for the specified doctor
      const appointments = await appoinmentModel
        .find({ doctor: doctorId })
        .populate("patientName", "first_name last_name email age country phoneNumber address city state zip_code")
        .select("-doctor");

      // Return success response with the appointments
      return sendSuccessResponse(
        res,
        appointments,
        200,
        "Congratulations! Appointments retrive successfully."
      );
    } catch (error) {
      console.error("Error getting appointments:", error);
      // Handle errors and send an appropriate response
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  });
}