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

export const appointmentValidation = async (data) => {
  const schema = yup.object({
    doctorId: yup.string().required('Doctor ssis required'),
    patientName: yup.string().required('Patient name is required'),
    slotId: yup.string().required('Slot ID is required'),
  });

  return await validateData(schema, data);
};
