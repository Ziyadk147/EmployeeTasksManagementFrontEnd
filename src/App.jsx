import React, {Suspense, useEffect, useState} from 'react';
import { Card } from 'primereact/card';
import { InputText as PrimeInputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Login from "./Pages/Login/Login.jsx";
import useLoginAction from "./Redux/Login/LoginActionHook.js";
import {useSelector} from "react-redux";
import {Route, Routes} from "react-router";
import SidebarComponent from './Components/Sidebar/Sidebar.jsx'
import {PanelMenu} from "primereact/panelmenu";
export default function App() {
    const { refreshLoginCheck } = useLoginAction();
    const isAuthenticated = useSelector((state) => state.LoginReducer.isAuthenticated);
    useEffect(() => {
        refreshLoginCheck()
    }, [isAuthenticated]);

    const Login = React.lazy(() => import('./Pages/Login/Login.jsx'))
    const Main = React.lazy(() => import('./Pages/Main/Main.jsx'))
    const Employees = React.lazy(() => import('./Pages/Employees/Employees.jsx'))
    const EmployeesCreate = React.lazy(() => import('./Pages/Employees/EmployeesCreate.jsx'))

    const pages = [

        {name: "Login" , path:"/login" , element: <Login />},
        {name: "Employees" , path:"/employees/index" , element: <Employees /> },
        {name: "EmployeesCreate" , path:"/employees/create" , element: <EmployeesCreate /> },
        {name: "Main" , path:"/" , element: <Main /> }
    ]
    const menuItems = [
        {
            label: "Dashboard",
            icon: "pi pi-fw pi-home",
            command: () => (window.location.href = "/dashboard"),
        },
        {
            label: "Settings",
            icon: "pi pi-fw pi-cog",
            command: () => (window.location.href = "/settings"),
        },
        {
            label: "Profile",
            icon: "pi pi-fw pi-user",
            command: () => (window.location.href = "/profile"),
        },
    ];

    return (
        <div className="flex flex-row lg:flex-row " style={{height:"97vh"}}>
            {/* Sidebar */}
            {isAuthenticated && (
                <div className="w-2 lg:w-2/12 p-3 shadow-lg">
                    <SidebarComponent></SidebarComponent>
                </div>
            )}

            {/* Main Content */}
            <div className={`flex-1 flex p-4 ${!isAuthenticated && "justify-content-center align-items-center"}`}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {pages &&
                            pages.map((page, key) => (
                                <Route key={key} path={page.path} element={page.element}/>
                            ))}
                    </Routes>
                </Suspense>
            </div>
        </div>

)}
