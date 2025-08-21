import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const Child = forwardRef((props, ref) => {
  const inputRef = useRef(null);

   console.log("child input ref------>",inputRef)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
  }));

  return <input ref={inputRef} />;
});

function Parent() {
  const childRef = useRef();

   console.log("childrefffffff",childRef.current)

  return (
    <>
      <Child ref={childRef} />
      <h2>
      {childRef?.current?.value}
      </h2>
     
      <button onClick={() => childRef.current.focus()}>Focus Child</button>
    </>
  );
}

export default Parent