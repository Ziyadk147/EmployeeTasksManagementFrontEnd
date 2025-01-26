import {
    DELETE_EMPLOYEE_FAILURE,
    DELETE_EMPLOYEE_REQUEST,
    DELETE_EMPLOYEE_SUCCESS, EMPLOYEE_FIND_SUCCESS,
    EMPLOYEES_FAILURE, EMPLOYEES_SUCCESS,
    FETCH_EMPLOYEES_REQUEST,
} from "./EmployeeTypes.js";

export const employeeGet = () => {
    return {type:FETCH_EMPLOYEES_REQUEST}
}
export const employeeGetSuccess = (data) => {
    return {
        type:EMPLOYEES_SUCCESS,
        payload: data
    }
}
export const employeeFailure = (error) => {
    return {
        type:EMPLOYEES_FAILURE,
        payload: error
    }
}

export const getEmployeeByIdSuccess = (data) => {
    return {
        type:EMPLOYEE_FIND_SUCCESS,
        payload: data
    }
}


export const deleteEmployeeRequest = () => {
    return {
        type: DELETE_EMPLOYEE_REQUEST,
    }
}
export const deleteEmployeeSuccess = (id) => {
    return {
        type: DELETE_EMPLOYEE_SUCCESS,
        payload: {id}
    }
}
export const deleteEmployeeFailure = (error) => {
    return {
        type: DELETE_EMPLOYEE_FAILURE,
        payload: error
    }
}

// export const employeeCreate = ( payload ) => {
//     return {
//         type:ADD_EMPLOYEE_SUCCESS,
//         payload:{  payload }
//     }
// }
// export const employeeUpdate = (payload ) => {
//     return {
//         type: UPDATE_EMPLOYEE_SUCCESS,
//         payload: { payload }
//     }
// }
// export const employeeDelete = (payload ) => {
//     return {
//         type: UPDATE_EMPLOYEE_SUCCESS,
//         payload: { payload }
//     }
// }

