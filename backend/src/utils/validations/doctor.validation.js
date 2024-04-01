// doctorValidation.js
import * as yup from 'yup';

const validateData = async (schema, data) => {
  try {
    // Validate data using the provided schema
    await schema.validate(data);

    // Validation succeeded
    return { status: true };
  } catch (error) {
    // Validation failed
    return {
      status: false,
      error: error.message.replace(/"/g, ''),
    };
  }
};

export const doctorValidation = async (data) => {
  const schema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8, 'Password must be at least 8 characters').max(20, 'Password must be at most 20 characters').required("Password is required"),
    location: yup.string().required(),
    languages: yup.string().required(),
    password: yup.string().required(),
    specialist: yup.string().required("Specialist is required"),
  });

  return await validateData(schema, data);
};

export const doctorSignInValidation = async (data) => {
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
  });

  return await validateData(schema, data);
};
// Define other schemas for different validation purposes if required
