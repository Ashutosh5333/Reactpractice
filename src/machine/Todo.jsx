import React, { useState } from "react";
import "./Todo.css";

function Todo() {
  const [data, SetData] = useState([]);
  const [formdata, SetFormdata] = useState({
    name: "",
    age: ""
  });
  const [editIndex, setEditIndex] = useState(null);

  const usedebounce = (fn, d) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, d);
    };
  };

  const handleChange = usedebounce((e) => {
    const { name, value } = e.target;
    SetFormdata({ ...formdata, [name]: value });
  }, 1000);

  // console.log("data",data)
  console.log("fomrdata",formdata)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      console.log("edit",editIndex)
      const updatedData = [...data];
      updatedData[editIndex] = formdata;
      SetData(updatedData);
      setEditIndex(null);
    } else {
      SetData([...data, formdata]);
    }
    SetFormdata({
      name: "",
      age: ""
    });
  };

  const handleEdit = (i) => {
    setEditIndex(i);
    SetFormdata(data[i]);
  };

  const handleDelete = (i) => {
    const res = data.filter((el, index) => index !== i);
    SetData(res);
  };

  return (
    <>
      <h2 className="text-center">Hello</h2>
      <form onSubmit={handleSubmit} className="">
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Age"
          name="age"
       
          onChange={handleChange}
        />

        <input type="submit" value={editIndex !== null ? "Update" : "Add"} />
      </form>
      <br />

      {data.length > 0 &&
        data.map((el, i) => {
          return (
            <div
              className="text-success-emphasis"
              style={{ color: "black" }}
              key={i}
            >
              <ul>
                <li>hello</li>
                <li>{el.name}</li>
                <li>{el?.age}</li>
                <button onClick={() => handleEdit(i)}>Edit</button>
                <button onClick={() => handleDelete(i)}>Delete</button>
              </ul>
            </div>
          );
        })}
    </>
  );
}

export default Todo;
