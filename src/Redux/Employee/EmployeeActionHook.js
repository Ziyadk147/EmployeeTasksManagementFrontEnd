import {useDispatch, useSelector} from "react-redux";
import {toast} from 'react-toastify'
import {useNavigate} from "react-router";
import {employeeGet, employeeGetSuccess} from "./EmployeeActions.js";
import {createEmployee, getAllEmployees} from "../../Service/auth.service.js";
const useEmployeeAction = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const getEmployees = async () => {
        dispatch(employeeGet())
        const response = await getAllEmployees();
        dispatch(employeeGetSuccess(response.data))
    }
    const addEmployee = async (payload) => {
        const response = await createEmployee(payload)
        if(response?.status){
            toast(response?.message || "Employee Created Successfully" )
            navigate('/employees/index')
        }
        else{
            toast(response?.message || "Error Creating Employee")
        }
    }

    const deleteEmployee = async (payload) => {
        const response = await createEmployee(payload)
        if(response?.status){
            toast(response?.message || "Employee Deleted Successfully" )
            navigate('/employees/index')
        }
        else{
            toast(response?.message || "Error Creating Employee")
        }
    }
    return {
        getEmployees , addEmployee
    }
}
export default useEmployeeAction