import {FETCH_TASK_REQUEST, TASK_FAILURE, TASK_SUCCESS} from "./TaskTypes.js";

export const taskGet = () => {
    return {type:FETCH_TASK_REQUEST}
}
export const taskGetSuccess = (data) => {
    return {
        type:TASK_SUCCESS,
        payload: data
    }
}
export const taskFailure = (error) => {
    return {
        type:TASK_FAILURE,
        payload: error
    }
}