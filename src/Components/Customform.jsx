import React, { useState, useEffect, useCallback, memo } from "react";

const Customform = () => {
  const [data, setData] = useState([]);
  const [inputValues, setInputValues] = useState({
    name: "",
    age: "",
    skill: "",
  });
  // const [formData, setFormData] = useState({
  //   name: "",
  //   age: "",
  //   skill: "",
  // });

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // const debouncedSetFormData = debounce((newFormData) => {
  //   setFormData(newFormData);
  // }, 1000); // Adjust the delay (300 milliseconds) based on your preference

     console.log("formdata",inputValues)
     const handleInputChange = (e) => {
      const { name, value } = e.target;
      setInputValues({ ...inputValues, [name]: value });
      }

  // const handleInputChange = useCallback((e) => {
  //   const { name, value } = e.target;
  //   setInputValues((prevInputValues) => ({ ...prevInputValues, [name]: value }));
  //   debouncedSetFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  // }, [debouncedSetFormData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, inputValues]);
    setInputValues({ name: "", age: "", skill: "" }); // Clear input values after submitting
  };

  const handleDelete = (i) => {
    const updatedData = data.filter((item, index) => i !== index);
    setData(updatedData);
  };

  const totalAge = data.reduce((acc, el) => acc + Number(el.age), 0);

  return (
    <>
      All User Age: {totalAge}
      <ul>
        {data.length > 0 &&
          data.map((item, i) => (
            <div key={i}>
              <li>Name: {item.name}</li>
              <li>Age: {item.age}</li>
              <li>Skill: {item.skill}</li>
              <button onClick={() => handleDelete(i)}>Delete</button>
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