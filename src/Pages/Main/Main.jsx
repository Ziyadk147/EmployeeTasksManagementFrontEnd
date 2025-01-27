import useLoginAction from "../../Redux/Login/LoginActionHook.js";
import {useEffect} from "react";

const Main = () => {
    const {isAuthenticated} = useLoginAction();

    useEffect(() => {
        if(!isAuthenticated){
            window.location.href = "/login"
        }
    })
    return (
        <h1>Hello</h1>
    )
}
export default Main