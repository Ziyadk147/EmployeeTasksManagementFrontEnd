import React, {useEffect, useState} from 'react';
import { Card } from 'primereact/card';
import { InputText as PrimeInputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Login from "./Pages/Login/Login.jsx";
import useLoginAction from "./Redux/Login/LoginActionHook.js";
import {useSelector} from "react-redux";
export default function App() {
    const { refreshLoginCheck } = useLoginAction();
    const isAuthenticated = useSelector((state) => state.LoginReducer.isAuthenticated);
    useEffect(() => {
        refreshLoginCheck()
    }, [isAuthenticated]);

        console.log(isAuthenticated)


    return (
        <div className="flex justify-content-center align-items-center bg-gray-100" style={{ height: '98vh' }}>

            <Login></Login>
        </div>
    );
}
