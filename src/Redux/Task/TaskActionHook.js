import {useDispatch} from "react-redux";
import {toast} from 'react-toastify'
import {
     createTask,
     getAllTasks,


} from "../../Service/auth.service.js";
import {taskGet, taskGetSuccess} from "./TaskActions.js";

const useTaskAction = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate()
    // const tasks = useSelector(state => state.TaskReducer.tasks)
    const getTasks = async () => {
        dispatch(taskGet())
        const response = await getAllTasks();
        dispatch(taskGetSuccess(response.data))
    }
    const addTask = async (payload) => {
        const response = await createTask(payload)
        if (response?.status) {
            // window.location.href = '/kanban'
            toast(response?.message || "Employee Created Successfully")
        } else {
            toast(response?.message || "Error Creating Employee")
        }
    }
    // const getEmployeeById = async (id) => {
    //     const employee = employees.filter((item) => item.id === parseInt(id))
    //     dispatch(getEmployeeByIdSuccess(employee))
    //     console.log(employees)
    // }
    //
    // const UpdateEmployee = async (values, id) => {
    //     const response = await updateEmployee(values, id)
    //     if (response?.status) {
    //         window.location.href = '//'
    //         toast(response?.message || "Employee Updated Successfully")
    //
    //     } else {
    //         toast(response?.message || "Error Updating Employee")
    //     }
    // }
    //
    //
    // const destroyEmployee = async (payload) => {
    //     dispatch(deleteEmployeeRequest())
    //     const response = await deleteEmployee(payload)
    //     if (response?.status) {
    //         toast(response?.message || "Employee Deleted Successfully")
    //         dispatch(deleteEmployeeSuccess(payload))
    //     } else {
    //         dispatch(deleteEmployeeFailure(response?.message || "Error Deleting Employee"))
    //         toast(response?.message || "Error Deleting Employee")
    //     }
    // }
    return {
        getTasks , addTask
    }
}
export default useTaskAction