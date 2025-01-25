import React, {Suspense, useEffect, useState} from 'react';
import { Card } from 'primereact/card';
import { InputText as PrimeInputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Login from "./Pages/Login/Login.jsx";
import useLoginAction from "./Redux/Login/LoginActionHook.js";
import {useSelector} from "react-redux";
import {Route, Routes} from "react-router";
export default function App() {
    const { refreshLoginCheck } = useLoginAction();
    const isAuthenticated = useSelector((state) => state.LoginReducer.isAuthenticated);
    useEffect(() => {
        refreshLoginCheck()
    }, [isAuthenticated]);

    const Login = React.lazy(() => import('./Pages/Login/Login.jsx'))
    const Employees = React.lazy(() => import('./Pages/Employees/Employees.jsx'))

    const pages = [

        {name: "Login" , path:"/login" , element: <Login />},
        {name: "Employees" , path:"/" , element: <Employees /> }
    ]

    return (
        <div className="flex justify-content-center align-items-center bg-gray-100" style={{ height: '98vh' }}>

            {/*<Login></Login>*/}
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {pages &&
                        pages.map((page, key) => (
                            <Route key={key} path={page.path} element={page.element}></Route>
                        ))}
                </Routes>
            </Suspense>
        </div>
    );
}
