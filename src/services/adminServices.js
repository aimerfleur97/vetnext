import AxiosRequest from "@/utils/AxiosRequest";


// doctor apis
const doctorAdd = async (payload) => {
    try {
        const response = await AxiosRequest.post('/doctor/create', payload);
        return response
    } catch (error) {
        throw error
    }
}

const doctorUpdate = async (id, payload) => {
    try {
        const response = await AxiosRequest.put(`/doctor/update/${id}`, payload);
        return response
    } catch (error) {
        throw error
    }
}

const doctorDetail = async (id) => {
    try {
        const response = await AxiosRequest.get(`/doctor/details/${id}`);
        return response
    } catch (error) {
        throw error
    }
}

const doctorsData = async () => {
    try {
        const response = await AxiosRequest.get(`/doctor/all`);
        return response
    } catch (error) {
        throw error
    }
}

const deleteDoctor = async (doctorId) => {
    try {
        const response = await AxiosRequest.delete(`/doctor/delete/${doctorId}`);
        return response
    } catch (error) {
        throw error
    }
}

// Slots Api 

const getSlots = async (doctorId) => {
    try {
        const response = await AxiosRequest.get(`/slots/getslots/${doctorId}`);
        return response
    } catch (error) {
        throw error
    }
}

const createSlots = async (payload) => {
    try {
        const response = await AxiosRequest.post(`/slots/generateSlots`, payload);
        return response
    } catch (error) {
        throw error
    }
}

const deleteSlots = async (slotsId, mainId) => {
    try {
        const response = await AxiosRequest.delete(`/slots/deleteslot/${slotsId}?mainId=${mainId}`);
        return response
    } catch (error) {
        throw error
    }
}

// Appointment Api

const getAppointments = async (doctorId) => {
    try {
        const response = await AxiosRequest.get(`/appointment/get/${doctorId}`);
        return response
    } catch (error) {
        throw error
    }
}

export { doctorAdd, doctorUpdate, doctorDetail, doctorsData, deleteDoctor, getSlots, createSlots, deleteSlots, getAppointments }