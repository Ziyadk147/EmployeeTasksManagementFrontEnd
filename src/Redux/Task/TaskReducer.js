import {TaskInitial} from "./TaskInitial.js";
import {FETCH_TASK_REQUEST, TASK_FAILURE, TASK_SUCCESS} from "./TaskTypes.js";

const TaskReducer = (state = TaskInitial , action) => {
    switch (action.type){
        case FETCH_TASK_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case TASK_SUCCESS:
            return {
                tasks: action.payload,
                isLoading: false

            }
        case TASK_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }


        default:
            return state
    }
}
export default TaskReducer