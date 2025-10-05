import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from './action'

const Showdata = () => {
    const count = useSelector((state) =>console.log("state",state))
    const dispatch = useDispatch()
      
       const hadlefetch = () => {
          dispatch(getData)
       }


  return (
    <div>
        <button onClick={()=>dispatch({type:"INCRESCOUNT"})}> Count </button>
         <button onClick={hadlefetch}> Fetch data </button>
    </div>
  )
}

export default Showdata