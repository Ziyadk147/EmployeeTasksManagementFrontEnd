import { createStore , combineReducers, applyMiddleware } from "redux";
import {LoginReducer} from "./Login/LoginReducer.js";

const rootReducers = combineReducers(
    {LoginReducer}
)

const store = createStore(rootReducers )

export default store