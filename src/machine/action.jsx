import axios from "axios"
import  * as types from "./actiontypes"

 export const incresecount = () =>{
      return {
        type: types.INCRESCOUNT
      }
 }
 const loginReq = () =>{
    return {
      type: types.LOGINREQ
    }
}
const loginSucess = (payload) =>{
    return {
      type: types.LOGINSUCESS,
      payload
    }
}
const loginFailure = () =>{
    return {
      type: types.LOGINREFAILURE
    }
}
export const getData =  (dispatch) =>{
    dispatch(loginReq())

    return axios
    .get(`https://fakestoreapi.com/products`)
    .then((res) =>{
  return      dispatch(loginSucess(res.data))
    })
    .catch((err) =>{
       dispatch(loginFailure())
    })
}