import {LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT} from "./LoginTypes.js";

export const loginStart = () => {
    return {type:LOGIN_START}
}
export const loginSuccess = ( token) => {
    return {
        type:LOGIN_SUCCESS,
        payload:{  token }
    }
}
export const loginFailure = (error) => {
    return {
        type: LOGIN_FAILURE,
        payload: {error}
    }
}

export const Logout = () => {
    return {
        type: LOGOUT
    }
}