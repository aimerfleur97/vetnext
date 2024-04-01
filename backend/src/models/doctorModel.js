// doctorModel.js 
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
    },
    location: String,
    designation: String,
    languages: String,
    password: String,
    specialist: String
});

const doctorModel = mongoose.model('Doctor', doctorSchema);

export default doctorModel;