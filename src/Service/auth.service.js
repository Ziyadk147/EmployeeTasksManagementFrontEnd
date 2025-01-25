import { get, post } from "../web.request";

export const loginRequest = async (data) => {
    return await post(`/login` , data);
}
export const logoutRequest = async () => {
    return await post(`/logout`);
}

export const createEmployee = async (payload) => {
    return await post(`/employee` , payload);
}
export const getAllEmployees = async () => {
    return await get("/employee")
}
