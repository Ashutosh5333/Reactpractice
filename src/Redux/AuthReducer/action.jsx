import axios from "axios"
import * as types from "./actiotypes"
import { LOGINFAILURE, LOGINREQ, LOGINSUCCESS } from "./actiotypes"



export const Loginpost = (payload) =>(dispatch) =>{
   
      dispatch({type:LOGINREQ})

      return axios.post(`https://reqres.in/api/login`,payload)
        .then((res)=>{
            
       return  dispatch({type:LOGINSUCCESS,res})
        })
        .catch((err) =>{
            
             dispatch({type:LOGINFAILURE,err})
        })
}


/** Aws images and videos */

const ProjectfromReq = () => {
     return {
       type: types.PROJECTFORMPRIMAGESREQ,
     };
   };
   
   const ProjectformSucess = (payload) => {
     return {
       type: types.PROJECTFORMPRIMAGESSUCESS,
       payload,
     };
   };
   
   const ProjectfromFail = () => {
     return {
       type: types.PROJECTFORMPRIMAGESFAILURE,
     };
   };
   // ------------ Put  -----------
   
   const updatedawsReq = () => {
     return {
       type: types.UPDATEDIMAGESAWS_DATA_REQUEST,
     };
   };
   const updatedawssucess = (payload) => {
     return {
       type: types.UPDATEDIMAGESAWS_DATA_SUCESS,
       payload,
     };
   };
   const updatedawsFail = () => {
     return {
       type: types.UPDATEDIMAGESAWS_DATA_FAILURE,
     };
   };
   


export const GetpresignedurlData = (param) => (dispatch) => {
     dispatch(ProjectfromReq());
     return axios
       .post(`http://localhost:8000/getPresignUrl`, param)
       .then((r) => {
         return dispatch(ProjectformSucess(r.data));
       })
       .catch((err) => {
         return dispatch(ProjectfromFail());
       });
   };
   
   export const UpdatedAwsPost =
     (apiurl, payload) => (dispatch) => {
       dispatch(updatedawsReq());
       return axios
         .put(apiurl, payload)
         .then((res) => {
           return dispatch(updatedawssucess(res.data));
         })
         .catch((e) => {
           return dispatch(updatedawsFail());
         });
     };
   