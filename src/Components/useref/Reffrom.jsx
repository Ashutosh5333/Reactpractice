import React, { useEffect, useRef, useState } from "react";

const FormWithRef = () => {
  // Creating refs for form elements
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  // Handle form submission
  //  console.log("nameInputRef======>",nameInputRef?.current?.value)
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  const countRef = useRef(0);
  //  let count =1
  //  useEffect(() => {
  //    prevCountRef.current = count;
  //  }, [count]);
  //   console.log("prevCountRef====>",prevCountRef)

  const handleClick = () => {
    countRef.current += 1;
    console.log("Ref Value:", countRef.current);
  };

  useEffect(() => {
    countRef.current += 1;
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Accessing values using refs
    const nameValue = nameInputRef.current.value;
    const emailValue = emailInputRef.current.value;

    setFormData({
      name: nameValue,
      email: emailValue,
    });

    // Do something with the form data
    console.log("Name:", nameValue);
    console.log("Email:", emailValue);
    // You can perform additional actions here, such as making API calls or updating state
  };

  return (
    <>
      <p>Ref Count: {countRef.current}</p> {/* UI won't update */}
      <button onClick={handleClick}>Increment</button>
      <p>Clicked: {count}</p>
      <p>Component re-rendered: {countRef.current} times</p>
      <button onClick={() => setCount((c) => c + 1)}>Click</button>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" ref={nameInputRef} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" ref={emailInputRef} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {formData.name && (
        <div>
          <h2>Submitted Data:</h2>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
        </div>
      )}
    </>
  );
};

export default FormWithRef;
