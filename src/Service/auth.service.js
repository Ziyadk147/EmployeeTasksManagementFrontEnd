import {deleteRequest, get, post, put} from "../web.request";

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
export const getEmployee = async (id) => {
    return await get(`/employee/${id}`)
}
export const updateEmployee = async (payload , id) => {
    return await put(`/employee/${id}` , payload);
}
export const deleteEmployee = async (id) => {
    return  await deleteRequest(`/employee/${id}`)
}

export const createTask = async (payload) => {
    return await post(`/task` , payload);
}
export const getAllTasks = async () => {
    return await get("/task")
}