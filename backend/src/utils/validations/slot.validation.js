import * as yup from "yup";

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
      error: error.message.replace(/"/g, ""),
    };
  }
};

export const slotValidation = async (data) => {
  const schema = yup.object({
    doctorId: yup.string().required("Doctor ID is required"),
    startDate: yup.date().required("Start date is required"),
    endDate: yup.date().required("End date is required"),
    startAt: yup.string().required("Start time is required"),
    endAt: yup.string().required("End time is required"),
    duration: yup.number().required("Duration is required"),
    rate: yup.number().required("rate is required"),
    currency: yup.string().required("Currency is required"),
  });

  return await validateData(schema, data);
};
