import { get, post } from "../web.request";

export const login = async (data) => {
    return await post(`/login` , data);
}