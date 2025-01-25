import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router";

export default function Employees(){
    const isAuthenticated = useSelector((state) => state.LoginReducer.isAuthenticated)
    const navigate = useNavigate()
    useEffect(() => {
        if(!isAuthenticated){
            navigate('/login')
        }
    }, []);
    return (
        <h1>Hello</h1>
    )

}

