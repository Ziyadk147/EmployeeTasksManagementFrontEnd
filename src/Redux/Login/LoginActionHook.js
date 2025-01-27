import {loginFailure, loginStart, loginSuccess, Logout} from "./LoginActions.js";
import {loginRequest, logoutRequest} from "../../Service/auth.service.js";
import {useDispatch, useSelector} from "react-redux";
import {toast} from 'react-toastify'
import {LOGIN_SUCCESS} from "./LoginTypes.js";
import {useNavigate} from "react-router-dom";
const useLoginAction = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const token = useSelector((state) => state.LoginReducer.token)
    const login = async (payload) => {
        dispatch(loginStart());
        try {
            const response = await loginRequest(payload);
            toast("Login Successful")
            localStorage.setItem("login_token" , response.data)
            dispatch(loginSuccess(response.data))
            window.location.href = '/'
        } catch (error) {
            dispatch(loginFailure(error) || "Login Failed")
            console.log(error)
        }
    }
    const logout = async () => {
        // console.log(token)
        if (token) {
            const response = await logoutRequest();
            if (response?.status) {
                toast(response.message || "Logged Out Successfully");
                localStorage.removeItem("login_token")
                dispatch(Logout())
                navigate('/login')
            }
        }
    }
    const refreshLoginCheck =() => {
        const token = localStorage.getItem("login_token")
        if(token){
            dispatch(loginSuccess(token))
            return true;
        }
        else{
            return false;
        }
    }
    return {
        login, logout, refreshLoginCheck
    }
}
export default useLoginAction