// validation.js
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

export const signupValidation = async (data) => {
  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  return await validateData(schema, data);
};

export const signValidation = async (data) => {
    const schema = yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
    });
  
    return await validateData(schema, data);
  };

  export const profileValidation = async (data) => {
    const schema = yup.object().shape({
        first_name: yup.string().trim().required(),
        last_name: yup.string().trim().required(),
        email: yup.string().email().required(),
        age: yup.number().positive().integer().required(),
        country: yup.string().required(),
        phoneNumber: yup.number().positive().integer().required(),
        address: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip_code: yup.string().required()
    });

    return await validateData(schema, data);
};
// Define other schemas for different validation purposes if required
