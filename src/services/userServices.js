import AxiosRequest from "@/utils/AxiosRequest";

const getAppointmentSlots = async (doctorID, type, date) => {
    try {
        const response = await AxiosRequest.get(`/slots/getslots/${doctorID}?type=${type}&date=${date}`);
        return response
    } catch (error) {
        throw error
    }
}

const getDoctors = async () =>{
    try {
        const response = await AxiosRequest.get(`/doctor/all`);
        return response
    } catch (error) {
        throw error
    }
}

const bookAppointment = async (payload) =>{
    try {
        const response = await AxiosRequest.post(`/appointment/create`, payload);
        return response
    } catch (error) {
        throw error
    }
}

const profileUpdate = async (userId, payload) =>{
    try {
        const response = await AxiosRequest.put(`/user/profile/${userId}`, payload);
        return response
    } catch (error) {
        throw error
    }
}

const getUserprofile = async (userId) =>{
    try {
        const response = await AxiosRequest.get(`/user/profile/get/${userId}`);
        return response
    } catch (error) {
        throw error
    }
}

const doctorLogin = async (payload) =>{
    try {
        const response = await AxiosRequest.post(`/doctor/signin`, payload);
        return response
    } catch (error) {
        throw error
    }
}
export { getAppointmentSlots, getDoctors, bookAppointment, profileUpdate, getUserprofile, doctorLogin }