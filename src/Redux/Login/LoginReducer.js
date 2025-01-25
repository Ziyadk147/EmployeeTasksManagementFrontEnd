import {LoginInitialState} from "./LoginInitial.js";
import {LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT} from "./LoginTypes.js";

export const LoginReducer = (state = LoginInitialState , action) => {
    switch (action.type){
        case LOGIN_START:
            return {
                ...state,
                isLoading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                isLoading: false
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload.error
            }
        case LOGOUT:
            return {
                isLoading: false,
                isAuthenticated: false,
                token: null,
                errors: null
            }
        default:
            return state
    }
}