import * as Yup from 'yup';

export const profileValidationSchema = Yup.object().shape({
  first_name: Yup.string().trim().required("First name is required"),
  last_name: Yup.string().trim().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email address is required"),
  age: Yup.number().positive().integer().required("Age is required"),
  country: Yup.string().required("Country is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip_code: Yup.string().required("ZIP / Postal code is required"),
  pets: Yup.array().of(
    Yup.object().shape({
        name: Yup.string().required("Pet name is required"),
        species: Yup.string().required("Species is required"),
        breed: Yup.string().required("Breed is required"),
        age: Yup.number().positive("Pet age must be a positive number").integer("Pet age must be an integer").required("Pet age is required"),
        medicalHistory: Yup.string().required("Medical history is required")
    })
).min(1, "At least one pet information is required")
});