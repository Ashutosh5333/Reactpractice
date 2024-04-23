import { legacy_createStore } from "redux";
import { Reducer } from "./ApppReducer/reducer";




export const store = legacy_createStore(Reducer)