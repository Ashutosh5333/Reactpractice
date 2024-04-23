import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GetpresignedurlData, UpdatedAwsPost } from "./Redux/AuthReducer/action";

const FileUploadForm = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    developerName: "",
    imageFile: null,
    pdfFiles: [],
    certificate10th: null,
    certificate12th: null,
    graduateCertificate: null,
  });
  const [image, SetImages] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "bloguser");
      data.append("cloud_name", "dgvfiwlap");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dgvfiwlap/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        // const response = await fetch(
        //   "https://api.cloudinary.com/v1_1/dgvfiwlap/raw/upload", // Use 'raw' for PDFs
        //   {
        //     method: "POST",
        //     body: data,
        //   }
        // );

        const responseData = await response.json();
        const imageUrl = responseData.url;

        setFormData({
          ...formData,
          [key]: imageUrl,
        });

        if (key === "imageFile") {
          SetImages(imageUrl);
        }
      } catch (err) {
        console.log(err, "err");
      }
    }
  };
  
  console.log("fomdata",formData)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle file upload logic here
  };
    console.log("image",image)

  //   const submitimgae = () => {
  //     const data = new FormData();
  //     data.append("file", image); // Make sure 'image' is defined
  //     data.append("upload_preset", "bloguser"); // Fixed typo in "upload_presets" to "upload_preset"
  //     data.append("cloud_name", "dgvfiwlap");
  
  //     fetch("https://api.cloudinary.com/v1_1/dgvfiwlap/image/upload", {
  //         method: "post",
  //         body: data
  //     })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("data", data)
  //       console.log("datayrl",data.url)
  //     }
  //    )
  //     .catch((err) => console.log(err, "err"));
  // }

  const openPDF = (url) => {
    // fetch(url)
    //   .then((res) => res.blob())
    //   .then((blob) => {
    //     const urlBlob = window.URL.createObjectURL(blob);
    //     window.open(urlBlob);
    //   })
    //   .catch((err) => console.log(err));
    window.open(url, '_blank');
  };
  
  // Usage in your component
  const pdfUrl = "https://res.cloudinary.com/dgvfiwlap/image/upload/v1713845685/f521k9grcce2o5s5njfa.pdf";
  
  

  return (
    <div>
      <h2>Upload Files</h2>

        {/* <input type="file" onChange={(e) =>SetImages(e.target.files[0])} />
        <button onClick={submitimgae} > upload </button> */}
      <button onClick={() => openPDF(pdfUrl)}>Open PDF</button>

       <br/>
       <br/>
       <br/>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Developer Name */}
        <div>
          <label htmlFor="developerName">Developer Name:</label>
          <input
            type="text"
            id="developerName"
            name="developerName"
            value={formData.developerName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Dynamic File Inputs */}
        <div>
          <label htmlFor="imageFile">Upload Image:</label>
          <input
            type="file"
            id="imageFile"
            onChange={(e) => handleFileChange(e, "imageFile")}
            required
          />
        </div>
        <div>
          <label htmlFor="pdfFiles">Upload Multiple PDFs:</label>
          <input
            type="file"
            id="pdfFiles"
            onChange={(e) => handleFileChange(e, "pdfFiles")}
            multiple
            required
          />
        </div>
        
        <div>
          <label htmlFor="certificate10th">Upload 10th Certificate:</label>
          <input
            type="file"
            id="certificate10th"
            onChange={(e) => handleFileChange(e, "certificate10th")}
            required
          />
        </div>
        
        <div>
          <label htmlFor="certificate12th">Upload 12th Certificate:</label>
          <input
            type="file"
            id="certificate12th"
            onChange={(e) => handleFileChange(e, "certificate12th")}
            required
          />
        </div>

        <div>
          <label htmlFor="graduateCertificate">Upload Graduate Certificate:</label>
          <input
            type="file"
            id="graduateCertificate"
            onChange={(e) => handleFileChange(e, "graduateCertificate")}
            required
          />
        </div>

        {/* Submit Button */}

        <div>
          <button type="submit">Upload Files</button>
        </div>
      </form>


    </div>
  );
};

export default FileUploadForm;
