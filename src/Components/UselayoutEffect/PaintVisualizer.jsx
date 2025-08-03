import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export function PaintVisualizer() {
  const boxRef = useRef();
  const [color, setColor] = useState("blue");

  // useEffect: runs after paint
  useEffect(() => {
    console.log("🟡 useEffect running...");
    setColor("green"); // This causes a second paint
  }, []);

  // useLayoutEffect: runs before paint
  // Uncomment this to see the difference!
//   useLayoutEffect(() => {
//     console.log("🔵 useLayoutEffect running...");
//     setColor("green"); // Happens before the screen updates
//   }, []);

  return (
    <div
      ref={boxRef}
      style={{
        width: "200px",
        height: "200px",
        backgroundColor: color,
        transition: "background-color 0.3s ease",
      }}
    >
      Color Box
    </div>
  );
}
