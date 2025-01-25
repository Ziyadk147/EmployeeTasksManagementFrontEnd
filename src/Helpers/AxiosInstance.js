import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL ?? "http://localhost:8000",
    headers: {
        "Content-Type" : "application/json"
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("login_token")
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)
