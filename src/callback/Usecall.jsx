import React, { memo, useState } from "react";

const Usecall = ({learning,add}) => {
 const [count,SetCount] = useState(0)

  console.log("child components")
  
  return <div>
     <h1> Child components </h1>

           {/* <h1> Use Callback :{count} </h1>
           <button onClick={()=>SetCount(count+1)}> Addd </button> */}

  </div> ;
};

export default memo(Usecall);
  // performance inhance karne ke liye use hota
 //  useCallback() returns a memoized version of a function.
//    This means that React will only re-create the function 
//    if the dependencies array changes. This can be useful for functions that are passed as callbacks,
//     as it can prevent React from re-rendering the component unnecessarily.
