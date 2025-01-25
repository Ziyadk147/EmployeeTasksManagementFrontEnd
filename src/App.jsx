import React, {Suspense, useEffect, useState} from 'react';
import { Card } from 'primereact/card';
import { InputText as PrimeInputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Login from "./Pages/Login/Login.jsx";
import useLoginAction from "./Redux/Login/LoginActionHook.js";
import {useSelector} from "react-redux";
import {Route, Routes} from "react-router";
import SidebarComponent from './Components/Sidebar/Sidebar.jsx'
export default function App() {
    const { refreshLoginCheck } = useLoginAction();
    const isAuthenticated = useSelector((state) => state.LoginReducer.isAuthenticated);
    useEffect(() => {
        refreshLoginCheck()
    }, [isAuthenticated]);

    const Login = React.lazy(() => import('./Pages/Login/Login.jsx'))
    const Main = React.lazy(() => import('./Pages/Main/Main.jsx'))
    const Employees = React.lazy(() => import('./Pages/Employees/Employees.jsx'))

    const pages = [

        {name: "Login" , path:"/login" , element: <Login />},
        {name: "Employees" , path:"/employees/index" , element: <Employees /> },
        {name: "Main" , path:"/" , element: <Main /> }
    ]

    return (

        <div className="flex w-full bg-gray-100" style={{height: '98vh'}}>
            {/* Main Content */}
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {pages &&
                            pages.map((page, key) => (
                                <Route key={key} path={page.path} element={page.element}/>
                            ))}
                    </Routes>
                </Suspense>
        </div>
    );
}
