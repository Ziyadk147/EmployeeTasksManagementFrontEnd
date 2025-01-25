import axios from "axios";
import {axiosInstance} from "./Helpers/AxiosInstance.js";
export const post = async (url, data) => {
    try {
        const response = await axiosInstance.post(url, data);
        if (response && response.data && response.data.status) {
            return {
                status: true,
                data: response?.data?.data || [],
                message: response?.data?.message,
            }
        } else {

            return {
                status: false,
                data: response?.data || [],
                message: response?.data?.message,
            }
        }
    } catch (error) {

        return {
            status: false,
            data: error?.response?.data || [],
            message: error?.response?.data?.message || 'Something went wrong',
        }
    }
};

export const get = async (url) => {
    try {
        const response = await axiosInstance.get(url);
        if (response && response.data && response.data.status) {
            return {
                status: true,
                data: response?.data?.data || [],
                message: response?.data?.message,
                total: response?.data?.total,
                minPrice: response?.data?.minPrice,
                maxPrice: response?.data?.maxPrice,
            }
        }
        else {
            return {
                status: false,
                data: response?.data || [],
                message: response?.data?.message,
            }
        }
    }
    catch (error) {

        return {
            status: false,
            data: error?.response?.data || [],
            message: error?.response?.data?.message || 'Something went wrong',
        }
    }
};

export const put = async (url, data) => {
    try {
        let header;

        const response = await axiosInstance.put(url, data);
        if (response && response.data && response.data.status) {
            return {
                status: true,
                data: response?.data?.data || [],
                message: response?.data?.message,
            }
        }
        else {
            return {
                status: false,
                data: response?.data || [],
                message: response?.data?.message,
            }
        }
    } catch (error) {

        return {
            status: false,
            data: error?.response?.data || [],
            message: error?.response?.data?.message || 'Something went wrong',
        }
    }
}

export const deleteRequest = async (url) => {
    try {

        const response = await axiosInstance.delete(url);
        if (response && response.data && response.data.status) {
            return {
                status: true,
                data: response?.data?.data || [],
                message: response?.data?.message,
            }
        }
        else {
            return {
                status: false,
                data: response?.data || [],
                message: response?.data?.message,
            }
        }
    } catch (error) {

        return {
            status: false,
            data: error?.response?.data || [],
            message: error?.response?.data?.message || 'Something went wrong',
        }
    }

}

export const patch = async (url, data) => {
    try {

        const response = await axiosInstance.patch(url, data);
        if (response && response.data && response.data.status) {
            return {
                status: true,
                data: response?.data?.data || [],
                message: response?.data?.message,
            }
        }
        else {
            return {
                status: false,
                data: response?.data || [],
                message: response?.data?.message,
            }
        }
    } catch (error) {

        return {
            status: false,
            data: error?.response?.data || [],
            message: error?.response?.data?.message || 'Something went wrong',
        }
    }
}



export const postToken = async (url, data) => {
    try {
        const response = await AxiosWithoutToken.post(url, data);
        if (response && response.data && response.data.status) {
            return {
                status: true,
                data: response?.data?.data || [],
                message: response?.data?.message,
            }
        } else {
            return {
                status: false,
                data: response?.data || [],
                message: response?.data?.message,
            }
        }
    } catch (error) {

        return {
            status: false,
            data: error?.response?.data || [],
            message: error?.response?.data?.message || 'Something went wrong',
        }
    }
};

export const getAllResponse = async (url) => {
    try {
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {

        return {
            status: false,
            data: error?.response?.data || [],
            message: error?.response?.data?.message || 'Something went wrong',
        }
    }
}

export const getAllResponsePost = async (url, data) => {
    try {
        const response = await axiosInstance.post(url, data);
        return response;
    } catch (error) {

        return {
            status: false,
            data: error?.response?.data || [],
            message: error?.response?.data?.message || 'Something went wrong',
        }
    }
}



export const getpagination = async (url) => {
    try {
        const response = await axiosInstance.get(url);
        if (response && response.status === 200) {
            return {
                status: response && response?.data && response?.data?.status,
                data: response && response?.data && response?.data?.data && response?.data?.data?.results || [],
                message: response?.data?.message || 'Something went wrong',
                count: response?.data?.data?.count && response?.data?.count,
            }
        }
        else {
            return {
                status: false,
                data: response?.data || [],
                message: response?.data?.message,
            }
        }
    }
    catch (error) {

        return {
            status: false,
            data: error?.response?.data || [],
            message: error?.response?.data?.message || 'Something went wrong',
        }
    }
};

export const reload = async (url, data) => {
    try {
        const token = localStorage.getItem('token');

        if (token) {
            axios.defaults.headers.common['x-auth-token'] = `Bearer ${token}`;
        }

        const response = await axios.post(`https://apidms.mobiginie.com${url}`, data);

        if (response && response.data && response.data.status) {
            return {
                status: true,
                data: response?.data?.data || [],
                message: response?.data?.message,
            }
        }
        else {
            return {
                status: false,
                data: response?.data || [],
                message: response?.data?.message,
            }
        }
    }
    catch (error) {

        return {
            status: false,
            data: error?.response?.data || [],
            message: error?.response?.data?.message || 'Something went wrong',
        }
    }
}
