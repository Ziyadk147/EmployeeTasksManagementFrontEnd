import React, {Suspense, useEffect, useState} from 'react';
import Login from "./Pages/Login/Login.jsx";
import useLoginAction from "./Redux/Login/LoginActionHook.js";
import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import SidebarComponent from './Components/Sidebar/Sidebar.jsx'
import {PanelMenu} from "primereact/panelmenu";
import useEmployeeAction from "./Redux/Employee/EmployeeActionHook.js";
export default function App() {
    const { refreshLoginCheck } = useLoginAction();
    const {getEmployees} = useEmployeeAction()
    const isAuthenticated = useSelector((state) => state.LoginReducer.isAuthenticated);
    useEffect(() => {
        refreshLoginCheck()
    }, [isAuthenticated]);

    useEffect(() => {
        getEmployees();
    }, []);
    const Login = React.lazy(() => import('./Pages/Login/Login.jsx'))
    const Employees = React.lazy(() => import('./Pages/Employees/Employees.jsx'))
    const EmployeesCreate = React.lazy(() => import('./Pages/Employees/EmployeesCreate.jsx'))
    const TaskManagement = React.lazy(() => import('./Pages/TaskManagement/TaskManagement.jsx'))

    const pages = [

        {name: "Login" , path:"/login" , element: <Login />},
        {name: "Employees" , path:"/" , element: <Employees /> },
        {name: "EmployeesCreate" , path:"/employees/create" , element: <EmployeesCreate /> },
        {name: "EmployeesEdit" , path:"/employees/:id" , element: <EmployeesCreate  /> },
        {name: "Kanban" , path:"/kanban" , element: <TaskManagement  /> },
    ]

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
