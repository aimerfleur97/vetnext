import catchAsync from "../utils/catchAsync.js";
import userModel from "../models/userModel.js";
import * as jwt from "jsonwebtoken"
import { signupValidation, signValidation } from "../utils/validations/user.validation.js";
import AppError from '../utils/appError.js';
import bcrypt from 'bcryptjs'
import { sendSuccessResponse } from "../utils/helperFunctions.js";

export class AuthController {
  static encryptPassword = async (password) => {
		return await bcrypt.hash(password, 12)
	}
  static signUp = catchAsync(async (req, res, next) => {
    try {

      const validate = await signupValidation(req.body)
      // Validate the payload
      if (!validate.status) {
        return next(new AppError(validate.error || 'Oops! The provided parameters are invalid. Please check your input and try again.', 400))
      }
      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return next(new AppError('This email address is already registered. Please use a different email.', 400))
      }

      const encryptedPassword = await this.encryptPassword(password) 

      // Create a new user
      const newUser = new userModel({
        name,
        email,
        password: encryptedPassword /* Other user information... */,
      });
      await newUser.save();
      if(newUser){
        return sendSuccessResponse(
					res,
					newUser,
					200,
					'Congratulations! Your signup successful.'
				)
      }
      // Return success response
    } catch (error) {
        console.log("error",error)
      res.status(500).json({ message: "Server error", error:error });
    }
  });

  static signIn = catchAsync(async (req, res, next) => {
    try {
      // Validate the payload using the sign-in schema
      const validate = await signValidation(req.body);
      if (!validate.status) {
        return next(new AppError(validate.error || 'Invalid login credentials. Please check your input and try again.', 400));
      }

      const { email, password } = req.body;

      // Check if the user exists
      const user = await userModel.findOne({ email });
      if (!user) {
        return next(new AppError('Invalid login credentials. Please check your email and password and try again.', 401));
      }

      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return next(new AppError('Invalid login credentials. Please check your email and password and try again.', 401));
      }
      // Generate a JWT token

      // const tokenid = jwt.sign({ userId : user._id }, process.env.JWT_SECRET)
      // const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      // Return success response with JWT token
      return sendSuccessResponse(
        res,
        { user },
        200,
        'Login successful.'
      );
    } catch (error) {
      console.error("error", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  static verifyJwtToken = catchAsync(async (req, res, next) => {
		let token
		// Check whether the token is present or not in the request
		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
			token = req.headers.authorization.split(' ')[1]
		}

		if (!token) {
			return next(new AppError('You are not authorized to access this API. Please contact the administrator for assistance.', 401))
		}

		const decoded = jwt.verify(token, config.get('JWT_SECRET'))
		// Attach id so that the next middleware can have the id to search for the user
		req.user = decoded

		next()
	})
}
