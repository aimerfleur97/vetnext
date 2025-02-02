import AppError from '../utils/appError.js'

const handleJWTError = () => new AppError('Invalid token. Please log in again to continue.', 401)

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`
	return new AppError(message, 400)
}

const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message)

	const message = `Invalid input data. ${errors.join('. ')}`
	return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err) => {
	const message = `Duplicate field value found. Please use another value!`
	return new AppError(message, 400)
}

const handleJWTExpiredError = (err) => new AppError('Your token has expired. Please log in again to continue.', 401)

const sendErrorDev = (err, req, res) => {
	return res.status(err.statusCode).send({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	})
}

const sendErrorProd = (err, req, res) => {
	// A) Operational, trusted error: send message to client
	if (err.isOperational) {
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		})
	}
	// B) Programming or other unknown error: don't leak error details
	// 1) Log error
	console.error('ERROR 💥', err)
	// 2) Send generic message
	return res.status(500).json({
		status: 'error',
		message: 'Oops! Something went very wrong!',
	})
}

const globalErrorHandler = (err, req, res, next) => {
	console.log('In globalErrorHandler', err.toString())
	console.log('error name = ', err.errors)

	err.statusCode = err.statusCode || 500
	err.status = err.status || 'error'

	if (process.env.NODE_ENV === 'development') {
		if (err.name === 'CastError') err = handleCastErrorDB(err)
		if (err.code === 11000) err = handleDuplicateFieldsDB(err)
		if (err.name === 'ValidationError') err = handleValidationErrorDB(err)
		if (err.name === 'JsonWebTokenError') err = handleJWTError()
		if (err.name === 'TokenExpiredError') err = handleJWTExpiredError(err)

		// sendErrorProd(err, req, res);

		sendErrorDev(err, req, res)
	} else if (process.env.NODE_ENV === 'production') {
		// let error = { ...err };
		// error.message = err.message;

		if (err.name === 'CastError') err = handleCastErrorDB(err)
		if (err.code === 11000) err = handleDuplicateFieldsDB(err)
		if (err.name === 'ValidationError') err = handleValidationErrorDB(err)
		if (err.name === 'JsonWebTokenError') err = handleJWTError()
		if (err.name === 'TokenExpiredError') err = handleJWTExpiredError(err)

		sendErrorProd(err, req, res)
	}
}

export default globalErrorHandler
