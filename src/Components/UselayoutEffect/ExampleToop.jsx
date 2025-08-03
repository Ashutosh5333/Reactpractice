import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function Example() {
    // const ref = useRef();
    // const [top, setTop] = useState(0);
  
    // useEffect(() => {
    //   setTop(ref.current.getBoundingClientRect().top);
    // }, []);
    const boxRef = useRef();
    const [height, setHeight] = useState(0);
  
    // Try changing this to useEffect and see difference
    useLayoutEffect(() => {
      const h = boxRef.current.getBoundingClientRect().height;
      setHeight(h);
    }, []);
    // useEffect(() => {
    //     const h = boxRef.current.getBoundingClientRect().height;
    //     setHeight(h);
    //   }, []);
    // useLayoutEffect(() => {
    //     setTop(ref.current.getBoundingClientRect().top);
    //   }, []);
  
    return (
      <div>
         <div
        ref={boxRef}
        style={{ height: Math.floor(Math.random() * 200) + 100, background: "skyblue" }}
      >
        Random Height Box
      </div>
      <p>The box height is: {height}px</p>
        {/* <div ref={ref} style={{ marginTop: "100px" }}>Box</div>
        <div style={{ position: "absolute", top }}>Tooltip</div> */}
      </div>
    );
  }
  