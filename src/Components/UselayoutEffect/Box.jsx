import { useLayoutEffect, useRef, useState } from "react";

export function Box() {
  const boxRef = useRef();
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const rect = boxRef.current.getBoundingClientRect();
    setWidth(rect.width);
  }, []);

  return (
    <div>
      <div ref={boxRef} style={{ width: "50%" }}>Resize me!</div>
      <p>Width is: {width}px</p>
    </div>
  );
}
