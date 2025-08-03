import React, { useState, useCallback, useEffect } from "react";

const Customform = () => {
  const [data, setData] = useState([]);
  const [inputValues, setInputValues] = useState({
    name: "",
    age: "",
    skill: "",
  });

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounced version of setInputValues
  const debouncedSetInputValues = useCallback(
    debounce((newInput) => {
      setInputValues(newInput);
    }, 100),
    [] // debounce should only be created once
  );
  console.log("inputValues------>", inputValues);
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const updatedForm = { ...inputValues, [name]: value };
      debouncedSetInputValues(updatedForm);
    },
    [inputValues, debouncedSetInputValues]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, inputValues]);
    setInputValues({ name: "", age: "", skill: "" }); // Clear form
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const totalAge = data.reduce((sum, item) => sum + Number(item.age || 0), 0);

  return (
    <>
      <h3>All User Age: {totalAge}</h3>

      <ul>
        {data.map((item, index) => (
          <div key={index}>
            <li>Name: {item.name}</li>
            <li>Age: {item.age}</li>
            <li>Skill: {item.skill}</li>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={inputValues.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={inputValues.age}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Skill:
            <input
              type="text"
              name="skill"
              value={inputValues.skill}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Customform;

// export default memo(Customform);
// import React, { useCallback, useState } from "react";

// const Customform = () => {
//   const [data, SetData] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     skill: "",
//   });

//   const handleInputChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   },[]);
//   console.log("formdata",formData)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//       // console.log("Form data:", formData);
//     SetData([...data, formData]);
//   };
//   console.log("data",data)

//   const handleDelete = (i) =>{
//        const filterdata = data.filter((item,index)=>
//            i !== index
//        )
//        console.log(filterdata,"filterdaaa")
//        SetData(filterdata)
//   }
//    const totalAge = data.reduce((acc,el)=>acc+ Number(el.age),0)
//       // console.log("totolage",totalAge)

//   return (
//     <>
//       All User Age : {}
//       <ul>
//         {data.length>0 && data.map((item, i) => (
//           <div key={i}>
//             <li>Name: {item.name}</li>
//             <li>Age:{item.age}</li>
//             <li>Skill{item.skill}</li>
//             <button onClick={()=>handleDelete(i)}> Delete </button>
//           </div>
//         ))}
//       </ul>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Age:
//             <input
//               type="number"
//               name="age"
//               value={formData.age}
//               onChange={handleInputChange}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Skill:
//             <input
//               type="text"
//               name="skill"
//               value={formData.skill}
//               onChange={handleInputChange}
//             />
//           </label>
//         </div>
//         <button type="submit">Submit</button>
//       </form>

//     </>
//   );
// };
