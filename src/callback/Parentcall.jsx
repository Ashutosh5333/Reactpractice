import React, { useCallback, useState } from "react";
import Usecall from "./Usecall";

const Parentcall = () => {
  const [count, SetCount] = useState(0);
  const [add, SetAdd] = useState(0);
  // A hook in React that returns a memoized callback function. It takes two arguments: a function and a dependencies array.
  //  The callback function is recreated only when one of the dependencies changes.

  const learning = useCallback(() => {
    console.log("learning............");
  }, [add]);

  // const learning =()=>{
  //   console.log("learning............");
  // }

  return (
    <div>
      <h1>Parentcall </h1>
      <h1> Add {add} </h1>
      <button onClick={() => SetAdd(add + 1)}> Addd </button>

      {/* learning={learning} add={add} */}
      <h1> Use Callback :{count} </h1>
      <Usecall learning={learning} />
      <button onClick={() => SetCount(count + 1)}> Count </button>
      {/* use callback using for my child components rerender 
      only when we want by click add */}
    </div>
  );
};

export default Parentcall;
