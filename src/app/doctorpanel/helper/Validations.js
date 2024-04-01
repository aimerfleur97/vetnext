import * as Yup from "yup";

export const doctorValidationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  location: Yup.string().required("Location is required"),
  designation: Yup.string().required("Designation is required"),
  languages: Yup.string().required("Languages is required"),
});