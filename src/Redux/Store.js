import { createStore , combineReducers, applyMiddleware } from "redux";
import {LoginReducer} from "./Login/LoginReducer.js";
import EmployeeReducer from "./Employee/EmployeeReducer.js";
import TaskReducer from "./Task/TaskReducer.js";

const rootReducers = combineReducers(
    {LoginReducer , EmployeeReducer , TaskReducer}
)

const store = createStore(rootReducers )

export default store