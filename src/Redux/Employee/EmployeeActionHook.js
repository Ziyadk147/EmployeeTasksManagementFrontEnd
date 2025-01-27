import {useDispatch, useSelector} from "react-redux";
import {toast} from 'react-toastify'
import {useNavigate} from "react-router-dom";
import {
    deleteEmployeeFailure,
    deleteEmployeeRequest,
    deleteEmployeeSuccess,
    employeeGet,
    employeeGetSuccess, getEmployeeByIdSuccess
} from "./EmployeeActions.js";
import {
    createEmployee,
    deleteEmployee,
    getAllEmployees,
    getEmployee,
    updateEmployee
} from "../../Service/auth.service.js";

const useEmployeeAction = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const employees = useSelector(state => state.EmployeeReducer.employees)
    const getEmployees = async () => {
        dispatch(employeeGet())
        const response = await getAllEmployees();
        dispatch(employeeGetSuccess(response.data))
    }
    const addEmployee = async (payload) => {
        const response = await createEmployee(payload)
        if (response?.status) {
            window.location.href = '/'
            toast(response?.message || "Employee Created Successfully")
        } else {
            toast(response?.message || "Error Creating Employee")
        }
    }
    const getEmployeeById = async (id) => {
        dispatch(employeeGet())
        const response = await getEmployee(id)
        dispatch(getEmployeeByIdSuccess(response.data))
    }

    const UpdateEmployee = async (values, id) => {
        const response = await updateEmployee(values, id)
        if (response?.status) {
            window.location.href = '/'
            toast(response?.message || "Employee Updated Successfully")

        } else {
            toast(response?.message || "Error Updating Employee")
        }
    }


    const destroyEmployee = async (payload) => {
        dispatch(deleteEmployeeRequest())
        const response = await deleteEmployee(payload)
        if (response?.status) {
            toast(response?.message || "Employee Deleted Successfully")
            dispatch(deleteEmployeeSuccess(payload))
        } else {
            dispatch(deleteEmployeeFailure(response?.message || "Error Deleting Employee"))
            toast(response?.message || "Error Deleting Employee")
        }
    }
    return {
        getEmployees, addEmployee, getEmployeeById, destroyEmployee , UpdateEmployee
    }
}
export default useEmployeeAction