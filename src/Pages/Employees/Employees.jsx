import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Card , DataTable , Column , Button} from 'primereact'
export default function Employees(){
    const isAuthenticated = useSelector((state) => state.LoginReducer.isAuthenticated)
    const navigate = useNavigate()
    useEffect(() => {
        if(!isAuthenticated){
            navigate('/login')
        }
    }, []);
    const [employees] = useState([
        { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'IT' },
        { id: 2, name: 'Jane Smith', position: 'Project Manager', department: 'Management' },
        { id: 3, name: 'Sam Brown', position: 'Designer', department: 'Design' },
        { id: 4, name: 'Emily White', position: 'HR Specialist', department: 'HR' },
        { id: 5, name: 'Michael Green', position: 'Developer', department: 'IT' }
    ]);

    const header = (
        <div className="flex  px-4 flex-row justify-content-between items-center">
            <div className="flex flex-column">
                <h2>Employees</h2>
            </div>
            <div className="flex flex-column pt-5">
                <Button
                label={"Create New Employee"}
                />

            </div>
        </div>
    );

    return (
        <div className="flex justify-content-center w-full mt-5" >
            <Card header={header} className="w-9 h-full">
                <DataTable value={employees} paginator rows={5} responsiveLayout="scroll">
                    <Column field="name" header="Name" sortable />
                    <Column field="position" header="Position" sortable />
                    <Column field="department" header="Department" sortable />
                    <Column field={"action"} header={"Action"} />
                </DataTable>
            </Card>
        </div>
    );
}

