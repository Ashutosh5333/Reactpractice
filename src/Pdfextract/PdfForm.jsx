import React, { useState } from 'react';
import Papa from "papaparse";

const PdfForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);

const handleFileChange = (e) => {
    const file = e.target.files[0];
     // console.log("fillee",file)

      Papa.parse(file,{
        header: true,
        skipEmptyLines: true,
        complete:function (result){
           console.log("results",result)

           const parseddata = result.data;

            parsedData.forEach((data,i) =>{
              console.log("dataa",data)
              setParsedData(data)
            })
        }

      })
  };
  
   console.log("data",parsedData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Upload PDF:</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      {/* Add more fields as necessary */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default PdfForm;
