import {employeeInitial} from "./EmployeeInitial.js";
import {
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

        default:
            return state
    }
}
export default EmployeeReducer