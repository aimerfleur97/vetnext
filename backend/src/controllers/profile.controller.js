import catchAsync from "../utils/catchAsync.js";
import userModel from "../models/userModel.js";
import { profileValidation } from "../utils/validations/user.validation.js";
import AppError from "../utils/appError.js";
import { sendSuccessResponse } from "../utils/helperFunctions.js";

export class ProfileController {
    static Update = catchAsync(async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const updates = req.body;
            const options = { new: true };
            const validate = await profileValidation(updates)
            // Validate the payload
            if (!validate.status) {
              return next(new AppError(validate.error || 'Oops! The provided parameters are invalid. Please check your input and try again.', 400))
            }
            const updatedProfile = await userModel.findByIdAndUpdate(userId, updates, options);
            if (!updatedProfile) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                return sendSuccessResponse(
                    res,
                    updatedProfile,
                    200,
                    'Congratulations! Your profile has been updated'
                )
            }

        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    });

    static Get = catchAsync(async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const userResponse = await userModel.findById({_id:userId})

            if (!userResponse) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                return sendSuccessResponse(
                    res,
                    userResponse,
                    200,
                    'Congratulations! Your profile has been retrived Successfully'
                )
            }

        } catch (error) {
            res.status(500).json({ message: "Server error", error: error });
        }
    });
}