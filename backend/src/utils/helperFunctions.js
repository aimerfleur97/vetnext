export const sendSuccessResponse = (res, data, statusCode, message) => {
	return res.status(statusCode).send({
		status: 'success',
		statusCode,
		data: data,
		message,
	})
}
