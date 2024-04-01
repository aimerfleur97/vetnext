// user.js (User Model)
import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  species: {
    type: String,
    default: "",
  },
  breed: {
    type: String,
    default: "",
  },
  age: {
    type: Number,
    default: 0,
  },
  medicalHistory: {
    type: String,
    default: "",
  }
});
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    default: "",
  },
  last_name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    default: "",
  },
  age: {
    type: Number,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: Number,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  zip_code: {
    type: String,
    default: "",
  },
  pets: [petSchema]
});



const userModel = mongoose.model('User', userSchema);

export default userModel;