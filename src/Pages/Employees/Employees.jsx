import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card , DataTable , Column , Button} from 'primereact'
import {getAllEmployees} from "../../Service/auth.service.js";
import useEmployeeAction from "../../Redux/Employee/EmployeeActionHook.js";
export default function Employees(){
    const { getEmployees , destroyEmployee} = useEmployeeAction()
    const isAuthenticated = useSelector((state) => state.LoginReducer.isAuthenticated)
    const employees = useSelector((state) => state.EmployeeReducer.employees)
    const navigate = useNavigate()
    useEffect(() => {
        if(!isAuthenticated){
            navigate('/login')
        }
    }, [isAuthenticated]);

    useEffect(() => {
        getEmployees()
    }, []);


    const handleEdit = (id) => {
        window.location.href = `/employees/${id}`
    }
    const handleDelete = (id) => {
        destroyEmployee(id);
        getEmployees()
    }



    const header = (
        <div className="flex  px-4 flex-row justify-content-between items-center">
            <div className="flex flex-column">
                <h2>Employees</h2>
            </div>
            <div className="flex flex-column pt-5">
                <Button
                label={"Create New Employee"}
                onClick={() => window.location.href = "/employees/create"}
                />

            </div>
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex justify-content-around">
                {employees && rowData && (
               <>
                   <Button
                       icon="pi pi-pencil"
                       className="p-button-rounded p-button-info"
                       onClick={() => handleEdit(rowData.id)}
                   />
                   <Button
                       icon="pi pi-trash"
                       className="p-button-rounded p-button-danger"
                       onClick={() => handleDelete(rowData.id)}
                   />
               </>
                )}

            </div>
        );
    };

    return (
        <div className="flex justify-content-center h-full  w-full mt-5" >
            <Card header={header} className="w-full">
                <DataTable value={employees} paginator rows={5} >
                    <Column field="id" header="id" sortable />
                    <Column field="firstName" header="First Name" sortable />
                    <Column field="lastName" header="Last Name" sortable />
                    <Column field="email" header="Email" sortable />
                    <Column body={actionBodyTemplate} header="Actions" />

                </DataTable>
            </Card>
        </div>
    );
}

