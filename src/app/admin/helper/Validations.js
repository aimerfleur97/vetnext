import * as Yup from "yup";

export const doctorValidationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, 'Password must be at least 8 characters').max(20, 'Password must be at most 20 characters').required("Password is required"),
  location: Yup.string().required("Location is required"),
  specialist: Yup.string().required("Services is required"),
  languages: Yup.string().required("Languages is required"),
});

export const doctorUpdateValidationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  location: Yup.string().required("Location is required"),
  specialist: Yup.string().required("Services is required"),
  languages: Yup.string().required("Languages is required"),
});