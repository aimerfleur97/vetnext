import catchAsync from "../utils/catchAsync.js";
import doctorModel from "../models/doctorModel.js";
import Slot from "../models/slotsModel.js";
import AppError from "../utils/appError.js";
import { sendSuccessResponse } from "../utils/helperFunctions.js";
import { slotValidation } from "../utils/validations/slot.validation.js";

function generateAvailableSlots(startAt, endAt, duration) {
  const availableSlots = [];

  // Parse start time and end time
  const [startHour, startMinute] = parseTime24(startAt);
  const [endHour, endMinute] = parseTime24(endAt);

  // Calculate the total number of minutes between start time and end time
  const totalMinutes =
    endHour * 60 + endMinute - (startHour * 60 + startMinute);

  // Calculate the number of slots based on the duration
  const numberOfSlots = Math.floor(totalMinutes / duration);

  // Generate available slots
  let currentHour = startHour;
  let currentMinute = startMinute;

  for (let i = 0; i < numberOfSlots; i++) {
    const slotEndMinute = (currentMinute + duration) % 60;
    const slotEndHour =
      currentHour + Math.floor((currentMinute + duration) / 60);

    // Format the slot start and end times as strings in 24-hour format
    const formattedSlot = {
      start: `${currentHour.toString().padStart(2, "0")}:${currentMinute
        .toString()
        .padStart(2, "0")}`,
      end: `${slotEndHour.toString().padStart(2, "0")}:${slotEndMinute
        .toString()
        .padStart(2, "0")}`,
      booked: false,
    };

    availableSlots.push(formattedSlot);

    // Update current time for the next slot
    currentHour = slotEndHour % 24;
    currentMinute = slotEndMinute;
  }

  return availableSlots;
}



function parseTime24(time) {
  const [hour, minute] = time.split(":").map((part) => parseInt(part));
  return [hour, minute];
}

export class SlotController {
  static Generate = catchAsync(async (req, res, next) => {
    try {
      const validate = await slotValidation(req.body);
      if (!validate.status) {
        return next(
          new AppError(
            validate.error ||
            "Oops! The provided parameters are invalid. Please check your input and try again.",
            400
          )
        );
      }
      const {
        doctorId,
        startDate,
        endDate,
        startAt,
        endAt,
        duration,
        rate,
        currency,
        appointmentType
      } = req.body;
      const doctor = await doctorModel.findById(doctorId);

      if (!doctor) {
        return next(new AppError("Doctor not found", 400));
      }
      const existingSlots = await Slot.find({
        doctorId,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
        // $or: [
        // { $and: [{ "slot.start": { $gte: startAt } }, { "slot.end": { $lte: endAt } }] }, // Slot completely within the specified time range
        // { $and: [{ "slot.start": { $lte: startAt } }, { "slot.end": { $gte: startAt } }] }, // Slot overlaps with the specified start time
        // { $and: [{ "slot.start": { $lte: endAt } }, { "slot.end": { $gte: endAt } }] } // Slot overlaps with the specified end time
        // ]
      });
      if (existingSlots.length > 0) {
        return next(
          new AppError("Slots already exist for the specified date range", 400)
        );
      }
      // const startAtNumber = parseInt(startAt); // The second argument specifies the radix, which is base 10 for decimal numbers.
      // const endAtNumber = parseInt(endAt);
      const durationNumber = parseInt(duration);
      const availableSlots = generateAvailableSlots(startAt, endAt, durationNumber);
      for (
        const currentDate = new Date(startDate);
        currentDate <= new Date(endDate);
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        let data = {
          doctorId,
          date: currentDate,
          slot: availableSlots.map(slot => ({ ...slot, appointmentType })),
          rate,
          currency,
          duration: duration
        }
        // Create a slot entry for the current date
        await Slot.create(data);
      }
      return sendSuccessResponse(
        res,
        availableSlots,
        200,
        "Congratulations! Slots generated successfully."
      );
    } catch (error) {
      console.log("errr", error)
      return next(new AppError("Server error", 500));
    }
  });

  static getSlots = catchAsync(async (req, res, next) => {
    try {
      const { doctorId } = req.params;
      const { type, date } = req.query;
      // Check if the doctor exists
      const doctor = await doctorModel.findById(doctorId);
      if (!doctor) {
        return next(new AppError("Doctor not found", 404));
      }

      let filteredSlots;
      let duration;
      if (date != undefined && type != undefined) {
        let query = { doctorId, date: new Date(date) }
        const slots = await Slot.find(query).sort({ date: 1 });
        if (slots.length > 0) {
          duration = slots[0]?.duration
          filteredSlots = slots[0].slot.filter(slot => slot.booked === false && slot.appointmentType === type);
        } else {
          filteredSlots = slots
          duration = slots[0]?.duration
        }
      } else {
        const slots = await Slot.find({ doctorId })
        filteredSlots = slots
      }
      return sendSuccessResponse(
        res,
        { slots: filteredSlots, duration: duration },
        200,
        "Slot details retrieved successfully."
      );

    } catch (error) {
      console.log("err", error)
      return next(new AppError("Server error", 500));
    }
  });

  static deleteSlot = catchAsync(async (req, res, next) => {
    try {
      const { slotId } = req.params;
      const { mainId } = req.query;
      const reee = await Slot.findOne({ _id: mainId })
      let result;
      if (reee.slot.length == 1) {
        result = await Slot.deleteOne({ _id: mainId });
      } else {
        result = await Slot.updateOne(
          {
            _id: mainId, // Match the document based on the input date
            "slot._id": slotId // Match the slot within the array based on its ID
          },
          {
            $pull: { // Use $pull to remove the matched slot from the array
              slot: { _id: slotId }
            }
          }
        );
      }


      if (result?.acknowledged) {
        return sendSuccessResponse(
          res,
          "",
          200,
          "Slot deleted successfully."
        );
      } else {
        return next(
          new AppError("Error while deleting a slot",
            400
          )
        );
      }
    } catch (error) {
      console.log("errr", error)
      return next(new AppError("Server error", 500));
    }
  })
}