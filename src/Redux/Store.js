import { createStore , combineReducers, applyMiddleware } from "redux";
import {LoginReducer} from "./Login/LoginReducer.js";
import EmployeeReducer from "./Employee/EmployeeReducer.js";

const rootReducers = combineReducers(
    {LoginReducer , EmployeeReducer}
)

const store = createStore(rootReducers )

export default store