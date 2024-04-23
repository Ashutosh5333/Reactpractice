import React, { useRef, useState } from 'react';

const FormWithRef = () => {
  // Creating refs for form elements
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  // Handle form submission
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
    console.log('Name:', nameValue);
    console.log('Email:', emailValue);

    // You can perform additional actions here, such as making API calls or updating state
  };

  

  return (
    <>
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
