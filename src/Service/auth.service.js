import { get, post } from "../web.request";

export const loginRequest = async (data) => {
    return await post(`/login` , data);
}
export const logoutRequest = async () => {
    return await post(`/logout`);
}
