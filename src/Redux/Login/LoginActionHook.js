import {loginFailure, loginStart, loginSuccess, Logout} from "./LoginActions.js";
import {loginRequest, logoutRequest} from "../../Service/auth.service.js";
import {useDispatch, useSelector} from "react-redux";
import {toast} from 'react-toastify'
const useLoginAction = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token)
    const login = async (payload) => {
        dispatch(loginStart());
        try {
            const response = await loginRequest(payload);
            toast("Login Successful")
            localStorage.setItem("login_token" , response.data)
            dispatch(loginSuccess(response.data))
        } catch (error) {
            dispatch(loginFailure(error) || "Login Failed")
            console.log(error)
        }
    }
    const logout = async () => {
        if (token) {
            const response = await logoutRequest();
            if (response?.status === 200) {
                toast(response.message || "Logged Out Successfully");
                dispatch(Logout())
            }
        }
    }
    return {
        login, logout
    }
}
export default useLoginAction