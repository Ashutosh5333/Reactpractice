// import { LOGINREQ } from "./actiotypes";
import * as types from "./actiotypes"


  const initailState ={
         isLoading:false,
          token:""
  }



export const Reducer = (state=initailState,action) =>{
       const {type,payload} = action;

        switch (type) {
            case types.LOGINREQ:
                return {
                ...state,
                 isLoading:true,
            }
            case types.LOGINSUCCESS:
                return {
                ...state,
                 isLoading:false,
            }
                
               
            default:
                return state;
        }



}