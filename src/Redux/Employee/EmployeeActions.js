import {
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

