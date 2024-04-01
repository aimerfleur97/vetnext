import AxiosRequest from "@/utils/AxiosRequest";

const signUp = async (payload) => {
    try {
        const response = await AxiosRequest.post('/user/signup', payload);
        return response
    } catch (error) {
        throw error
    }
}

const signIn = async (payload) => {
    try {
        const response = await AxiosRequest.post('/user/signin', payload);
        return response
    } catch (error) {
        throw error
    }
}

export { signUp, signIn }