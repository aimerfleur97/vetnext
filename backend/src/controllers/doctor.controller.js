import catchAsync from "../utils/catchAsync.js";
import doctorModel from "../models/doctorModel.js";
import { doctorValidation, doctorSignInValidation } from "../utils/validations/doctor.validation.js";
import AppError from "../utils/appError.js";
import { sendSuccessResponse } from "../utils/helperFunctions.js";
import bcrypt from 'bcryptjs'
import Slot from "../models/slotsModel.js";

export class DoctorController {
  static encryptPassword = async (password) => {
    return await bcrypt.hash(password, 12)
  }

  static SignIn = catchAsync(async (req, res, next) => {
    try {
      const validate = await doctorSignInValidation(req.body);
      const {
        email,
        password
      } = req.body;

      if (!validate.status) {
        return next(
          new AppError(
            validate.error ||
            "Oops! The provided parameters are invalid. Please check your input and try again.",
            400
          )
        );
      }
      const doctor = await doctorModel.findOne({ email });
      if (!doctor) {
        return next(new AppError('Invalid login credentials. Please check your email and password and try again.', 401));
      }

      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, doctor.password);
      if (!isPasswordValid) {
        return next(new AppError('Invalid login credentials. Please check your email and password and try again.', 401));
      }

      return sendSuccessResponse(
        res,
        doctor,
        200,
        'Login successful.'
      );
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Server error", error: error });
    }
  });

  static Create = catchAsync(async (req, res, next) => {
    try {
      const validate = await doctorValidation(req.body);
      const {
        first_name,
        last_name,
        email,
        location,
        languages,
        password,
        specialist
      } = req.body;
      // Validate the payload
      if (!validate.status) {
        return next(
          new AppError(
            validate.error ||
            "Oops! The provided parameters are invalid. Please check your input and try again.",
            400
          )
        );
      }

      const existingUser = await doctorModel.findOne({ email });
      if (existingUser) {
        return next(new AppError("The doctor is already present", 400));
      }
      const encryptedPassword = await this.encryptPassword(password)

      const newDoctor = new doctorModel({
        first_name,
        last_name,
        email,
        location,
        languages,
        password: encryptedPassword,
        specialist
      });
      await newDoctor.save();
      if (newDoctor) {
        return sendSuccessResponse(
          res,
          newDoctor,
          200,
          "Congratulations! Doctor created successfully."
        );
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Server error", error: error });
    }
  });

  static Update = catchAsync(async (req, res, next) => {
    try {
      const validate = await doctorValidation(req.body);
      const {
        first_name,
        last_name,
        email,
        location,
        designation,
        languages
      } = req.body;

      // Validate the payload
      if (!validate.status) {
        return next(
          new AppError(
            validate.error || "Oops! The provided parameters are invalid. Please check your input and try again.",
            400
          )
        );
      }

      // Find the doctor by ID
      const { doctorId } = req.params;

      const existingDoctor = await doctorModel.findById(doctorId);
      if (!existingDoctor) {

        return next(new AppError("Doctor not found", 404));
      }

      // Update the doctor fields
      existingDoctor.first_name = first_name;
      existingDoctor.last_name = last_name;
      existingDoctor.email = email;
      existingDoctor.location = location;
      existingDoctor.designation = designation;
      existingDoctor.languages = languages;

      // Save the updated doctor
      await existingDoctor.save();

      // Return success response
      sendSuccessResponse(
        res,
        existingDoctor,
        200,
        "Doctor updated successfully."
      );
    } catch (error) {
      console.error("Error updating doctor:", error);
      res.status(500).json({ message: "Server error", error: error });
    }
  });

  static Details = catchAsync(async (req, res, next) => {
    try {
      const { doctorId } = req.params;
      let doctor = await doctorModel.findById(doctorId);
      if (!doctor) {
        return next(new AppError("Oops! No doctor found!", 400));
      }
      
      const slots = await Slot.find({doctorId})
      let minRate = Infinity;
      let currency = ""
      let doctorArray = []
      for (const slot of slots) {
        if (slot.rate < minRate) {
          minRate = slot.rate;
          currency = slot.currency
        }
      }

      doctorArray.push({...doctor})
      doctorArray[0]._doc.rate = minRate
      doctorArray[0]._doc.currency = currency


      return sendSuccessResponse(
        res,
        doctorArray[0]._doc,
        200,
        "Congratulations! Doctor details retrive successfully."
      );
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Server error", error: error });
    }
  });

  static AllDoctors = catchAsync(async (req, res, next) => {
    try {
      const doctors = await doctorModel.find();
      if (!doctors) {
        return next(new AppError("Oops! No doctor found!", 400));
      }

      let doctorsList = []

      for (let i = 0; i < doctors.length; i++) {
        const slots = await Slot.find({doctorId: doctors[i]._id})
        let minRate = Infinity;
        let currency = ""
        await slots.forEach(slot => {
          if (slot.rate < minRate) {
            minRate = slot.rate;
            currency= slot.currency
          }
        });

        doctorsList.push({...doctors[i]._doc, minRate, currency})
      }
      return sendSuccessResponse(
        res,
        doctorsList,
        200,
        "Congratulations! All doctors retrive successfully."
      );
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Server error", error: error });
    }
  });

  static Delete = catchAsync(async (req, res, next) => {
    try {
      const { doctorId } = req.params;
      const deletedDoctor = await doctorModel.findByIdAndDelete(doctorId);
      if (!deletedDoctor) {
        return next(new AppError('Doctor not found', 404));
      }
      return sendSuccessResponse(
        res,
        "",
        200,
        "Doctor deleted successfully"
      );
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Server error", error: error });
    }
  });
}
