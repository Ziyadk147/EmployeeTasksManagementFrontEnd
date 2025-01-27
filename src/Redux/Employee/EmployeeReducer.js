import {employeeInitial} from "./EmployeeInitial.js";
import {
    DELETE_EMPLOYEE_FAILURE,
    DELETE_EMPLOYEE_REQUEST, DELETE_EMPLOYEE_SUCCESS, EMPLOYEE_FIND_SUCCESS,
    EMPLOYEES_FAILURE, EMPLOYEES_SUCCESS,
    FETCH_EMPLOYEES_REQUEST,
} from "./EmployeeTypes.js";

const EmployeeReducer = (state = employeeInitial , action) => {
    switch (action.type){
        case FETCH_EMPLOYEES_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case EMPLOYEES_SUCCESS:
            return {
                employees: action.payload,
                isLoading: false

            }
        case EMPLOYEES_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        case EMPLOYEE_FIND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                selectedEmployee: action.payload
            }
        case DELETE_EMPLOYEE_REQUEST:
                    return {
                        ...state,
                        isLoading: true,
                    }
        case DELETE_EMPLOYEE_SUCCESS:
                    return {
                        ...state,
                        isLoading: false,
                        employees: [state.employees.filter((item ) => item.id !== action.payload.id)]
                    }
       case DELETE_EMPLOYEE_FAILURE:
                        return {
                            ...state,
                            isLoading: false,
                            errors: action.payload
                        }

        default:
            return state
    }
}
export default EmployeeReducer