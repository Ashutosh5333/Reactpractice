import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { thunk } from "redux-thunk";
import { Reducer as AuthReducer } from "./AuthReducer/reducer";
import { Reducer as AppReducer } from "./AppReducer/reducer";

const rootreducer = combineReducers({AuthReducer,AppReducer})


export const store = legacy_createStore(rootreducer,applyMiddleware(thunk))