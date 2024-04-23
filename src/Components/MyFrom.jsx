import React, { useState, useMemo } from 'react';

const MyForm = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  console.log("formdatttaaaaaa",formData)

  
              const memoizevalue = (cb, de) =>{
                let interval
                  return function(...args){
                      if(interval)  clearInterval(interval)       
                      interval =  setTimeout(() => {
                           cb(...args)
                     }, de);
                  }
            }
            
          const handlechnage = memoizevalue((e)=>{
                console.log("valueee",e.target.value)
          },1000)

  // Memoize the form component to prevent re-renders on unrelated state changes
  const MemoizedForm = useMemo(() => (
    <form>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
    </form>
  ), [formData]); // Re-renders only when formData changes

  return MemoizedForm;
};

export default MyForm;
