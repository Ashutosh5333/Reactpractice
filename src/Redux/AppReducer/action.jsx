import axios from "axios"
import * as types from "./actionType";


export  const incresereq = () =>{
       return {
          type:  types.IncresementPENDING
       }
}

export  const incresesuceess = () =>{
     return {
        type:  types.IncresementSUCESSS
     }
}

export  const incresefail = () =>{
     return {
        type:  types.IncresementFailure
     }
}

const getdatareq = () =>{
      return {
         type: types.GETDATAREQ
      }
}

const getdatasuccess = (payload) =>{
   return {
      type: types.GETDATASUCESSS,
      payload
   }
}

const getdatafailure = () =>{
   return {
      type: types.GETDATAFailure
   }
}


export const getData =  (dispatch) =>{
     dispatch(getdatareq())

     return axios
     .get(`https://fakestoreapi.com/products`)
     .then((res) =>{
   return      dispatch(getdatasuccess(res.data))
     })
     .catch((err) =>{
        dispatch(getdatafailure())
     })
}


