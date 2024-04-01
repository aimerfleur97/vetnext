import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Database connected successfully");
});

const PORT = parseInt(process.env.PORT || '4000');
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});