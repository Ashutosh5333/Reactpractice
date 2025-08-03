import React, { useEffect, useState } from "react";
import Lazyoptimise from "./Components/Lazyoptimise";
import FormWithRef from "./Components/useref/Reffrom";
import { Box } from "./Components/UselayoutEffect/Box";
import { Example } from "./Components/UselayoutEffect/ExampleToop";
import { PaintVisualizer } from "./Components/UselayoutEffect/PaintVisualizer";
import CounterExample from "./Components/counterExample/CounterExample";
import PraticeExample from "./SaberNotion/PraticeExample";
import MachinePratice from "./machine/MachinePratice";
import Customform from "./Components/Customform";
import Stopwatch from "./Components/Stopwatch";

const App = () => {
  const [state, setState] = useState(0);

  const handleclick = () => {
    // setState(state+1)
    //  setTimeout(() => {
    //     console.log("state=====>",state)
    //  },1000)
    // setState(prev => {
    //   const newState = prev + 1;
    //     console.log("newState inside functional setState:", newState);
    //   // setTimeout(() => {
    //   //   console.log("newState inside functional setState:", newState);
    //   // }, 1000);

    //   return newState;
    // });
    setState((prev) => prev + 1);
    // console.log("state=====>", state);
  };

  //  console.log("sttate after",state)

  return (
    <>
      <h2 className="text-center text-red-700"> hello </h2>
      {/* <button onClick={handleclick}> Click </button> */}
      {/* <PraticeExample/> */}
      {/* <MachinePratice/> */}
      {/* <Stopwatch/> */}


    </>
  );
};

export default App;
