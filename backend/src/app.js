import express from 'express'
import cors from 'cors'
import router from "./routes/allRoutes.js"
import AppError from './utils/appError.js';
import bodyParser from 'body-parser';
import globalErrorHandler from "./controllers/error.controller.js"
// const allRoutes = require('./routes/allRoutes');


const VERSION = 'v1'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())
app.use(`/api/${VERSION}`, router)

// body Parser

// This middleware will be called when the user requests for the path which is not defined
app.use('*', (req, res, next) => {
	next(new AppError(`Cannot find the path ${req.originalUrl} on this server, 404`))
})

app.use(globalErrorHandler)

export default app