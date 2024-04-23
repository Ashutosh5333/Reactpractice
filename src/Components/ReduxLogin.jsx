import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getData, incresesuceess } from "./Redux/AppReducer/action";
import { Button } from "bootstrap";
import ButtonBackground from "./Components/ButtonBackground";
import { Loginpost } from "./Redux/AuthReducer/action";
import { getincrsecount } from "./Newredux/ApppReducer/Action";

function App() {
    const dispatch = useDispatch()
    // const Getcount = useSelector((state) =>state.count)
    //  console.log("gettt",Getcount)
    // const Getdata = useSelector((state) =>state.AppReducer.data)
    //  console.log("gettt",Getdata)
      
    const payload ={
           email:"eve.holt@reqres.in",
           password:"cityslicka",
    }
    
    // const handleCount = () =>{
    //      dispatch(getincrsecount())
    //  }
 
    //  useEffect(() =>{
    //  dispatch(getData)
    //  },[]);

    //  const handleLogin = () =>{
    //      dispatch(Loginpost(payload))
    //      .then((res)=>{
    //       console.log(res)
    //      }).catch((err)=>{
    //       console.log(err)
    //      })
    //  }

                        

  return (
    <>
      <h1> hello welcome :  </h1> 
       {/* <button onClick={handleCount} > Incresecount </button> */}
       {/* <button onClick={handleLogin} > Login </button> */}

     </>
  );
}
 
export default App;
