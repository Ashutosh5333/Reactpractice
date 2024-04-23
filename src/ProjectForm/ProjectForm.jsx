"use client";
import axios from "axios";
import { useState, useEffect } from "react";




export default function ProjectsForm() {
//   console.log("id----------", id);
//   console.log("oncliked********", onclicked);

  const [image, SetImage] = useState("");
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [imagesMap, setImagesMap] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryError, setCategoryError] = useState(false);
  const [hashtagError, setHashtagError] = useState(false);
  const [hashtags, setHashtags] = useState([]);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
   const [singleproject, Setsingleproject] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    developerName: "",
    address: "",
    city: "",
    country: "mumbai",
    neighborhood: "Yorkville",
    landmark: "dadar",
    numberOfStoreys: "8",
    numberOfUnits: "7",
    occupancyDate: "a",
    maintenanceFees: "8",
    pricedFrom: "88",
    closingIn: 3,
    overViewImages: "",
    overViewVideos: "aman",
    aboutProject: "khkh",
    aboutImages: "",
    aboutVideos: "aman",
    featuresAndFinishes: "",
    featureImages: "a",
    featureVideos: "aman",
    aboutDeveloper: "a",
    developerImages: "a",
    developerVideos: "aman",
    question: "aa",
    answer: "a",
    location: "",
    title: "title",
    type: "project",
    deposit: "500000",
    categories: [],
    hashtags: [],
  });

   //   console.log("showheading***********",showHeading)

//    useEffect(() => {
//      if (singleproject) {
//        setFormData({
//          name: singleproject.name || "",
//          description: singleproject.description || "",
//          developerName: singleproject.developerName || "",
//          address: singleproject.address || "",
//          city: singleproject.city || "",
//          country: singleproject.country || "",
//          neighborhood: singleproject.neighborhood || "",
//          landmark: singleproject.landmark || "",
//          numberOfStoreys: singleproject.numberOfStoreys || "",
//          numberOfUnits: singleproject.numberOfUnits || "",
//          occupancyDate: singleproject.numberOfStoreys || "",
//          maintenanceFees: singleproject.maintenanceFees || "",
//          pricedFrom: singleproject.pricedFrom || "",
//          closingIn: singleproject.closingIn || 3,
//          overViewImages: singleproject.overViewImages || "",
//          overViewVideos: singleproject.overViewImages || "",
//          aboutProject: singleproject.aboutProject || "",
//          aboutImages: singleproject.aboutImages || "",
//          aboutVideos: singleproject.aboutVideos || "",
//          featuresAndFinishes: singleproject.featuresAndFinishes || "",
//          featureImages: singleproject.featureImages || "",
//          featureVideos: singleproject.featureVideos || "",
//          aboutDeveloper: singleproject.aboutDeveloper || "",
//          developerImages: singleproject.developerImages || "",
//          developerVideos: singleproject.developerVideos || "",
//          question: singleproject.question || "",
//          answer: singleproject.answer || "",
//          location: singleproject.location || "",
//          title: singleproject.title || "",
//          type: singleproject.type || "",
//          deposit: "500000",
//          categories: [],
//          hashtags: [],
//        });
//      }
//    }, [singleproject]);
   
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (e.target.tagName === "SELECT") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !value.trim(), // Set error to true if the value is empty
    }));
  };
  // console.log("fomrdata======================== project form", formData);

  const handleImageChange = async (e, key) => {
    const selectedFiles = e.target.files;
    const formDataCopy = { ...formData };
    const imagesCopy = { ...imagesMap };
    const newImages = [...(imagesCopy[key] || [])];
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: false,
    }));

    for (let i = 0; i < selectedFiles.length; i++) {
      const selectedFile = selectedFiles[i];
      const payloadImage = {
        fileType: selectedFile.name,
      };
      console.log("payloadimage========", payloadImage);
      const action = await GetpresignedurlData(payloadImage)(dispatch);
      console.log("Preurl===========", action);
      const preurl = action?.payload?.uploadUrl;

      // Upload the selected file to AWS
      const res = await UpdatedAwsPost(preurl, selectedFile)(dispatch);
      console.log("res===aws image", res);
      const uploadedImageUrl = action?.payload?.uploadUrl.split("?")[0];

      console.log("awsurlimage for setin formdata=======", uploadedImageUrl);

      // Store the uploaded image URL in the respective form data field (identified by key)
      if (!formDataCopy[key]) {
        formDataCopy[key] = [uploadedImageUrl];
      } else {
        formDataCopy[key].push(uploadedImageUrl);
      }

      newImages.push(selectedFile.name);
    }
    setFormData(formDataCopy);
    setImagesMap({
      ...imagesCopy,
      [key]: newImages,
    });

    if (selectedFiles.length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: false,
      }));
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    console.log("hello from backend apicall");
    const updatedErrors = Object.keys(formData).reduce((acc, key) => {
      if (!formData[key]) {
        return { ...acc, [key]: true };
      }
      return { ...acc, [key]: false };
    }, {});

    setErrors(updatedErrors);
    console.log(" submit errrors");
    if (selectedCategories.length === 0) {
      setCategoryError(true);
      // handle this error state accordingly in your UI
    } else {
      setCategoryError(false);
    }

    // Check if no hashtags are selected, set hashtag error
    if (selectedHashtags.length === 0) {
      setHashtagError(true);
      // handle this error state accordingly in your UI
    } else {
      setHashtagError(false);
    }
    //  if (Object.keys(updatedErrors).length > 0) {
    //    setErrors(updatedErrors);
    //    return;
    //  }
    //  setErrors({});

    Projectcreatepost(formData)(dispatch)
      .then((res) => {
        console.log("res=======", res);
        if (res.type === "UPDATEDIMAGESAWS_DATA_SUCESS") {
          toast.success("new Project created succesfully");
          setFormData({
            name: "",
            description: "",
            developerName: "",
            address: "",
            city: "",
            country: "",
            landmark: "",
            numberOfStoreys: "",
            numberOfUnits: "",
            occupancyDate: "",
            maintenanceFees: "",
            pricedFrom: "",
            overViewImages: "",
            overViewVideos: "",
            aboutProject: "",
            aboutImages: "",
            aboutVideos: "",
            featuresAndFinishes: "",
            featureImages: "",
            featureVideos: "",
            aboutDeveloper: "",
            developerImages: "",
            developerVideos: "",
            type: "",
            deposit: "",
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const removeImage = (key, index) => {
    const imagesCopy = { ...imagesMap };
    const updatedImages = imagesCopy[key].filter((image, i) => i !== index);

    const updatedFormData = { ...formData };
    updatedFormData[key] = updatedFormData[key].filter((_, i) => i !== index); // Filter form data

    setImagesMap({
      ...imagesCopy,
      [key]: updatedImages,
    });

    setFormData(updatedFormData);
  };

  const handleCategorySelect = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
      setFormData({
        ...formData,
        categories: [...formData.categories, category],
      });
    }
    setCategoryError(false);
  };

  const handleHashtagSelect = (hashtag) => {
    if (!selectedHashtags.includes(hashtag)) {
      setSelectedHashtags([...selectedHashtags, hashtag]);
      setFormData({
        ...formData,
        hashtags: [...formData.hashtags, hashtag], // Add new hashtag to the array
      });
    }
    setHashtagError(false);
  };

  useEffect(() => {
        GetSingleprojectData(id)(dispatch)
          .then((res) => {
            //  console.log("Single projectdata",res)
            Setsingleproject(res?.payload?.data);
          })
          .catch((err) => {
            console.log("err", err);
          });
    const dummyCategories = ["Category 1", "Category 2", "Category 3"];
    setCategories(dummyCategories);
    const dummyHashtags = ["#tag1", "#tag2", "#tag3"];
    setHashtags(dummyHashtags);
  }, []);

  console.log("singledata**********************",singleproject)
  const handleRemoveCategory = (categoryToRemove) => {
    const updatedCategories = selectedCategories.filter(
      (category) => category !== categoryToRemove
    );
    setSelectedCategories(updatedCategories);
    setFormData({
      ...formData,
      categories: formData.categories.filter(
        (category) => category !== categoryToRemove
      ),
    });
  };

  const handleRemoveHashtag = (hashtagToRemove) => {
    const updatedHashtags = selectedHashtags.filter(
      (hashtag) => hashtag !== hashtagToRemove
    );
    setSelectedHashtags(updatedHashtags);
    setFormData({
      ...formData,
      hashtags: formData.hashtags.filter(
        (hashtag) => hashtag !== hashtagToRemove
      ),
    });
  };

  const handletoggle =() =>{
    // setShowHeading(true)
    onclicked(false)
  }

   const handleupdatedprojectadmin = async (e) => {
     e.preventDefault();
     console.log("singleporject id ", singleproject._id);
     UpdatedprojectData(
       singleproject._id,
       formData
     )(dispatch)
       .then((res) => {
         console.log("resupdated data", res);
         if (res?.type === "UPDATEDPROJECTSUCESS") {
           toast.success("Updated project succesfully");
         }
       })
       .catch((err) => {
         console.log("err", err);
       });
   };

  return (
    <>
      {/* <button onClick={() => onclicked(false)}>Back</button> */}
      <div className="max-w-7xl border-red-800">
       

        <hr className="border mt-5 px-2 border-black" />

        <form onSubmit={handleCreateProject}>
          <div className="Main-container mt-5 py-2 px-2  m-auto border-yellow-500">
            <section className="Overview-Container  border-green-800 ">
              <div className="px-4 py-2 gap-2 flex">
                <p className="bg-black text-white rounded-full  px-2 "> 1 </p>
                <h1 className="font-semibold">Overview </h1>
              </div>

              <div className="Project-container py-2  border-green-900">
                <div className="container-box  px-2  flex flex-col sm:flex-row sm:justify-between   border-pink-800">
                  <div className=" sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Project Name *{" "}
                    </label>
                    <div className="py-2">
                      <input
                        onChange={handleInputChange}
                        name="name"
                        value={formData.name}
                        placeholder={"Type your project here" || formData.name}
                        className={`border-2 ${
                          errors["name"] ? "border-red-500" : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["name"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a name
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Description*{" "}
                    </label>
                    <div className="py-2">
                      <input
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Add a clear & short description about the condo"
                        className={`border-2 ${
                          errors["description"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["description"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a description
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/*** */}
                <div className="container-box px-2 flex flex-col sm:flex-row sm:justify-between     border-pink-800">
                  <div className=" sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Developer Name *{" "}
                    </label>
                    <div className="py-2">
                      <input
                        type="text"
                        name="developerName"
                        value={formData.developerName}
                        onChange={handleInputChange}
                        placeholder=" Developer Name "
                        className={`border-2 ${
                          errors["developerName"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["developerName"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a name
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">Address* </label>
                    <div className="py-2">
                      <input
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your Address"
                        className={`border-2 ${
                          errors["address"] ? "border-red-500" : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["address"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a Address
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/*** */}

                <div className="container-box px-2 flex flex-col sm:flex-row sm:justify-between    border-pink-800">
                  <div className=" sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Neighbourhood *{" "}
                    </label>
                    <div className="py-2">
                      <input
                        name="city"
                        value={formData.city}
                        type="text"
                        onChange={handleInputChange}
                        placeholder="Neighbourhood"
                        className={`border-2 ${
                          errors["city"] ? "border-red-500" : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["city"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a Neighbourhood
                        </p>
                      )}
                    </div>
                  </div>

                  <div className=" sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Number of Storeys *{" "}
                    </label>
                    <div className="py-2">
                      <input
                        type="Number"
                        name="numberOfStoreys"
                        value={formData.numberOfStoreys}
                        onChange={handleInputChange}
                        placeholder="Number of Storeys"
                        className={`border-2 ${
                          errors["numberOfStoreys"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["numberOfStoreys"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a numberOfStoreys
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/*** */}

                <div className="container-box px-2  flex flex-col sm:flex-row sm:justify-between     border-pink-800">
                  <div className=" sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Number of Units *{" "}
                    </label>
                    <div className="py-2">
                      <input
                        name="numberOfUnits"
                        type="Number"
                        value={formData.numberOfUnits}
                        onChange={handleInputChange}
                        placeholder="Number of Units"
                        className={`border-2 ${
                          errors["numberOfUnits"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["numberOfUnits"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a numberOfUnits
                        </p>
                      )}
                    </div>
                  </div>

                  <div className=" sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Occupancy Date **{" "}
                    </label>
                    <div className="py-2">
                      <input
                        type="date"
                        name="occupancyDate"
                        value={formData.occupancyDate}
                        onChange={handleInputChange}
                        placeholder="Occupancy Date"
                        className={`border-2 ${
                          errors["occupancyDate"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["occupancyDate"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a occupancyDate
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/*** */}

                <div className="container-Maintenance-box px-2 flex flex-col sm:flex-row sm:justify-between    border-pink-800">
                  <div className=" sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Maintenance Fees *{" "}
                    </label>
                    <div className="py-2">
                      <input
                        type="Number"
                        name="maintenanceFees"
                        value={formData.maintenanceFees}
                        onChange={handleInputChange}
                        placeholder="Maintenance Fees"
                        className={`border-2 ${
                          errors["maintenanceFees"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["maintenanceFees"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a maintenanceFees
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Priced From*{" "}
                    </label>
                    <div className="py-2">
                      <input
                        value={formData.pricedFrom}
                        name="pricedFrom"
                        type="Number"
                        onChange={handleInputChange}
                        placeholder="Priced From"
                        className={`border-2 ${
                          errors["pricedFrom"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["pricedFrom"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a Priced
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/***Category */}

                <div className="container-Category-box px-2 flex flex-col sm:flex-row sm:justify-between    border-pink-800">
                  <div className="container-Category  py-2 sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Add Category*{" "}
                    </label>

                    <div className=" py-1 mt-2 border-grey rounded flex flex-wrap">
                      {selectedCategories.map((category, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor: "#f0f0f0",
                            borderRadius: "4px",
                            padding: "4px",
                            margin: "4px",
                          }}
                        >
                          {category}
                          <button
                            onClick={() => handleRemoveCategory(category)}
                          >
                            <Image
                              src={"/assets/close"}
                              width={40}
                              height={40}
                              alt="close"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                    {categoryError && (
                      <p className="text-red-500 text-sm mt-1">
                        Please select at least one category
                      </p>
                    )}
                    <div className="border-2  rounded border-grey Show-category py-2 px-2 flex justify-between">
                      {categories
                        .filter((category) =>
                          category
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                        )
                        .map((category, index) => (
                          <div
                            className="bg-[#f0f0f0] px-2 py-1 rounded flex justify-between border-black"
                            key={index}
                            onClick={() => handleCategorySelect(category)}
                          >
                            <div> {category} </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="Container-hastags py-2 sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Add Hashtags *{" "}
                    </label>

                    <div className=" py-1 mt-2 border-grey rounded flex flex-wrap">
                      {selectedHashtags.map((hashtag, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor: "#f0f0f0",
                            borderRadius: "4px",
                            padding: "4px",
                            margin: "4px",
                          }}
                        >
                          {hashtag}
                          <button onClick={() => handleRemoveHashtag(hashtag)}>
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                    {hashtagError && (
                      <p className="text-red-500 text-sm mt-1">
                        Please select at least one hashtag
                      </p>
                    )}
                    <div className="Show-Hastags border-2 rounded border-grey  py-2 px-2 flex justify-between">
                      {hashtags
                        .filter((hashtags) =>
                          hashtags
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                        )
                        .map((hashtag, index) => (
                          <div
                            className=" bg-[#f0f0f0] px-2 py-1 rounded flex justify-between border-black"
                            key={index}
                            onClick={() => handleHashtagSelect(hashtag)}
                          >
                            <div> {hashtag} </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/*** */}

                <div className="Overview-container-box px-2  flex flex-col sm:flex-row sm:justify-between    border-pink-800">
                  <div className=" sm:w-[50%] px-2 py-2 border-green-700">
                    <label className="font-semibold py-2 text-sm">
                      Add images/videos*{" "}
                    </label>

                    <div
                      className={`border-2 ${
                        errors["overViewImages"]
                          ? "border-dashed border-red-500"
                          : " border-dashed border-[#C2C2C2]"
                      } py-8 mt-5 bg-[#EEEEEE]  rounded-lg h-[30vh] w-[100%]`}
                    >
                      <label className=" border-green-700">
                        <input
                          onChange={(e) =>
                            handleImageChange(e, "overViewImages")
                          }
                          type="file"
                          placeholder="overview images"
                          className="border border-grey text-sm
                          hidden
                          rounded py-2 px-2 w-[100%] "
                          multiple
                        />

                        <div
                          className="w-[50%]  relative top-[20%] border-red-700 m-auto
                      flex items-center justify-center
                      "
                        >
                          <img
                            src={"/assets/image.svg"}
                            alt="imagelogo"
                            width={50}
                            height={50}
                            className="m-auto"
                          />
                        </div>
                        <p className="py-4 text-[#707070] text-center">
                          {" "}
                          Click here to add images/videos
                        </p>
                      </label>
                    </div>
                    {errors["overViewImages"] && (
                      <p className="text-red-500 text-sm mt-1">Select Image</p>
                    )}
                    {/**** */}
                    <div className="Container-Selected-image">
                      {imagesMap["overViewImages"] &&
                        imagesMap["overViewImages"].map((imageObj, index) => (
                          <div
                            key={index} // Consider using a unique identifier from imageObj instead of index
                            className="rounded mt-2 mb-1 py-2 bg-[#EEEEEE] border-red-700 flex justify-between"
                          >
                            <h2 className="px-2 text-sm text-[#707070]">
                              <span>{imageObj}</span>
                            </h2>
                            <button
                              onClick={() =>
                                removeImage("overViewImages", index)
                              }
                              className="px-2 text-sm text-[#707070]"
                            >
                              X
                            </button>
                          </div>
                        ))}
                    </div>

                    <div className="Container-filesize  py-1 border-red-700 flex justify-between">
                      <h2 className=" px-2 text-sm text-[#707070]">
                        {" "}
                        Maximum size :5 MB
                      </h2>
                      <h2 className=" px-2 text-sm text-[#707070]">
                        {" "}
                        SVG, PNG , JPG OR MP4{" "}
                      </h2>
                    </div>
                  </div>
                </div>

                {/*** */}
              </div>
            </section>

            {/*** About project */}
            <hr className="border mt-5 px-2 border-black" />

            <section className="About-Container mt-5 border-green-800 ">
              <div className="px-4 py-2 gap-2 flex">
                <p className="bg-black text-white rounded-full  px-2 "> 2 </p>
                <h1 className="font-semibold"> About Project </h1>
              </div>

              <div className="AboutProject-container py-2  border-green-900">
                <div className="container-box  px-2 flex flex-col sm:flex-row sm:justify-between border-pink-800">
                  <div className=" sm:w-[50%]  px-2 py-2 border-green-700">
                    <label className="font-semibold py-2 text-sm">
                      About *
                    </label>

                    <div className="mt-5  w-[100%]">
                      <textarea
                        type="text"
                        onChange={handleInputChange}
                        name="aboutProject"
                        value={formData.aboutProject}
                        id="note"
                        className={`border-2 ${
                          errors["aboutProject"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm w-full h-44 px-4 py-4 text-gray-700 border rounded-lg flex justify-center items-center`}
                        placeholder="Type about your condo here..."
                      ></textarea>

                      {errors["aboutProject"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a aboutProject
                        </p>
                      )}
                    </div>
                    <h2 className="py-2 px-2 text-sm text-[#707070]">
                      {" "}
                      250 characters max
                    </h2>
                  </div>

                  <div className=" sm:w-[50%]  px-2 py-2 border-green-700">
                    <label className="font-semibold py-2 text-sm">
                      Add images/videos*{" "}
                    </label>

                    <div
                      className={`border-2 ${
                        errors["aboutImages"]
                          ? "border-dashed border-red-500"
                          : " border-dashed border-[#C2C2C2]"
                      } py-8 mt-5 bg-[#EEEEEE]  rounded-lg h-44 w-[100%]`}
                    >
                      <label className=" border-green-700">
                        <input
                          onChange={(e) => handleImageChange(e, "aboutImages")}
                          type="file"
                          placeholder="aboutImages"
                          className="border border-grey text-sm hidden rounded py-2 px-2 w-[100%]  justify-center items-center"
                          multiple
                        />

                        <div
                          className="w-[50%] relative top-[20%] border-red-700 m-auto
                      flex items-center justify-center
                      "
                        >
                          <img
                            src={"/assets/image.svg"}
                            alt="imagelogo"
                            width={50}
                            height={50}
                            className="m-auto"
                          />
                        </div>
                        <p className="py-4 text-[#707070] text-center">
                          {" "}
                          Click here to add images/videos
                        </p>
                      </label>
                    </div>
                    {errors["aboutImages"] && (
                      <p className="text-red-500 text-sm mt-1">Select Image</p>
                    )}
                    <div className="Container-Selected-image">
                      {imagesMap["aboutImages"] &&
                        imagesMap["aboutImages"].map((imageObj, index) => (
                          <div
                            key={index} // Consider using a unique identifier from imageObj instead of index
                            className="rounded mt-2 mb-1 py-2 bg-[#EEEEEE] border-red-700 flex justify-between"
                          >
                            <h2 className="px-2 text-sm text-[#707070]">
                              <span>{imageObj}</span>
                            </h2>
                            <button
                              onClick={() => removeImage("aboutImages", index)}
                              className="px-2 text-sm text-[#707070]"
                            >
                              X
                            </button>
                          </div>
                        ))}
                    </div>

                    <div className="Container-filesize  py-1 border-red-700 flex justify-between">
                      <h2 className=" px-2 text-sm text-[#707070]">
                        {" "}
                        Maximum size :5 MB
                      </h2>
                      <h2 className=" px-2 text-sm text-[#707070]">
                        {" "}
                        SVG, PNG , JPG OR MP4{" "}
                      </h2>
                    </div>
                  </div>
                </div>

                {/*** */}
              </div>
            </section>

            <hr className="border mt-5 px-2 border-black" />

            {/** Features & Finishes  */}

            <section className="Features-Container mt-5 border-green-800 ">
              <div className="px-4 py-2 gap-2 flex">
                <p className="bg-black text-white rounded-full  px-2 "> 3 </p>
                <h1 className="font-semibold"> Features & Finishes </h1>
              </div>

              <div className="Feature-Finishes-container py-2  border-green-900">
                <div className="container-box px-2 flex flex-col sm:flex-row sm:justify-between     border-pink-800">
                  <div className=" sm:w-[50%] px-2 py-2 border-green-700">
                    <label className="font-semibold py-2 text-sm">
                      Features & Finishes *
                    </label>

                    <div className="mt-5 w-[100%]">
                      <textarea
                        type="text"
                        value={formData.featuresAndFinishes}
                        name="featuresAndFinishes"
                        onChange={handleInputChange}
                        id="note"
                        className={`border-2 ${
                          errors["featuresAndFinishes"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm w-full h-44 px-4 py-4 text-gray-700 border rounded-lg `}
                        placeholder="Type about your features & finishes here ..."
                      ></textarea>
                      {errors["featuresAndFinishes"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a featuresAndFinishes
                        </p>
                      )}
                    </div>
                    <h2 className="py-2 px-2 text-sm text-[#707070]">
                      {" "}
                      250 characters max
                    </h2>
                  </div>

                  <div className=" sm:w-[50%]  px-2 py-2 border-green-700">
                    <label className="font-semibold py-2 text-sm">
                      Add images/videos*{" "}
                    </label>

                    <div
                      className={`border-2 ${
                        errors["featureImages"]
                          ? "border-dashed border-red-500"
                          : " border-dashed border-[#C2C2C2]"
                      } py-8 mt-5 bg-[#EEEEEE]  rounded-lg h-[30vh] w-[100%]`}
                    >
                      <label className=" border-green-700">
                        <input
                          onChange={(e) =>
                            handleImageChange(e, "featureImages")
                          }
                          type="file"
                          placeholder="featureImages"
                          className="border border-grey text-sm 
                          hidden
                          rounded py-2 px-2 w-[100%] "
                          multiple
                        />
                        <div
                          className="w-[50%] relative top-[20%] border-red-700 m-auto
                      flex items-center justify-center
                      "
                        >
                          <img
                            src={"/assets/image.svg"}
                            alt="imagelogo"
                            width={50}
                            height={50}
                            className="m-auto"
                          />
                        </div>
                        <p className="py-4 text-[#707070] text-center">
                          {" "}
                          Click here to add images/videos
                        </p>
                      </label>
                    </div>
                    {errors["featureImages"] && (
                      <p className="text-red-500 text-sm mt-1">Select images</p>
                    )}
                    <div className="Container-Selected-image">
                      {imagesMap["featureImages"] &&
                        imagesMap["featureImages"].map((imageObj, index) => (
                          <div
                            key={index} // Consider using a unique identifier from imageObj instead of index
                            className="rounded mt-2 mb-1 py-2 bg-[#EEEEEE] border-red-700 flex justify-between"
                          >
                            <h2 className="px-2 text-sm text-[#707070]">
                              <span>{imageObj}</span>
                            </h2>
                            <button
                              onClick={() =>
                                removeImage("featureImages", index)
                              }
                              className="px-2 text-sm text-[#707070]"
                            >
                              X
                            </button>
                          </div>
                        ))}
                    </div>

                    <div className="Container-filesize  py-1 border-red-700 flex justify-between">
                      <h2 className=" px-2 text-sm text-[#707070]">
                        {" "}
                        Maximum size :5 MB
                      </h2>
                      <h2 className=" px-2 text-sm text-[#707070]">
                        {" "}
                        SVG, PNG , JPG OR MP4{" "}
                      </h2>
                    </div>
                  </div>
                </div>

                {/*** */}
              </div>
            </section>

            {/*** About Develeper */}

            <hr className="border mt-5 px-2 border-black" />

            <section className="Features-Container mt-5 border-green-800 ">
              <div className="px-4 py-2 gap-2 flex">
                <p className="bg-black text-white rounded-full  px-2 "> 4 </p>
                <h1 className="font-semibold"> About Developer </h1>
              </div>

              <div className="AboutProject-container py-2  border-green-900">
                <div className="container-box px-2  flex flex-col sm:flex-row sm:justify-between    border-pink-800">
                  <div className=" sm:w-[50%] px-2 py-2 border-green-700">
                    <label className="font-semibold py-2 text-sm">
                      About Developer *
                    </label>

                    <div className="mt-5 w-[100%]">
                      <textarea
                        type="text"
                        value={formData.aboutDeveloper}
                        name="aboutDeveloper"
                        onChange={handleInputChange}
                        id="note"
                        className={`border-2 ${
                          errors["aboutDeveloper"]
                            ? "border-red-500"
                            : "border-grey"
                        } text-sm w-full h-44 px-4 py-4 text-gray-700 border rounded-lg `}
                        placeholder="Type about your About Developer here ..."
                      ></textarea>
                      {errors["aboutDeveloper"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a AboutDeveloper
                        </p>
                      )}
                    </div>
                    <h2 className="py-2 px-2 text-sm text-[#707070]">
                      {" "}
                      250 characters max
                    </h2>
                  </div>

                  <div className=" sm:w-[50%]  px-2 py-2 border-green-700">
                    <label className="font-semibold py-2 text-sm">
                      Add images/videos*{" "}
                    </label>

                    <div
                      className={`border-2 ${
                        errors["developerImages"]
                          ? "border-dashed border-red-500"
                          : " border-dashed border-[#C2C2C2]"
                      } py-8 mt-5 bg-[#EEEEEE]  rounded-lg h-[30vh] w-[100%]`}
                    >
                      {" "}
                      <label className=" border-green-700">
                        <input
                          onChange={(e) =>
                            handleImageChange(e, "developerImages")
                          }
                          // value={formData}
                          type="file"
                          placeholder="developer Images"
                          className="border border-grey text-sm 
                          hidden
                          rounded py-2 px-2 w-[100%] "
                          multiple
                        />
                        <div
                          className="w-[50%] relative top-[20%] border-red-700 m-auto
                      flex items-center justify-center
                      "
                        >
                          <img
                            src={"/assets/image.svg"}
                            alt="imagelogo"
                            width={50}
                            height={50}
                            className="m-auto"
                          />
                        </div>
                        <p className="py-4 text-[#707070] text-center">
                          {" "}
                          Click here to add images/videos
                        </p>
                      </label>
                    </div>
                    {errors["developerImages"] && (
                      <p className="text-red-500 text-sm mt-1">Select image</p>
                    )}
                    <div className="Container-Selected-image">
                      {imagesMap["developerImages"] &&
                        imagesMap["developerImages"].map((imageObj, index) => (
                          <div
                            key={index} // Consider using a unique identifier from imageObj instead of index
                            className="rounded mt-2 mb-1 py-2 bg-[#EEEEEE] border-red-700 flex justify-between"
                          >
                            <h2 className="px-2 text-sm text-[#707070]">
                              <span>{imageObj}</span>
                            </h2>
                            <button
                              onClick={() =>
                                removeImage("developerImages", index)
                              }
                              className="px-2 text-sm text-[#707070]"
                            >
                              X
                            </button>
                          </div>
                        ))}
                    </div>
                    <div className="Container-filesize  py-1 border-red-700 flex justify-between">
                      <h2 className=" px-2 text-sm text-[#707070]">
                        {" "}
                        Maximum size :5 MB
                      </h2>
                      <h2 className=" px-2 text-sm text-[#707070]">
                        {" "}
                        SVG, PNG , JPG OR MP4{" "}
                      </h2>
                    </div>
                  </div>
                </div>

                {/*** */}
              </div>
            </section>

            {/************* Upload files **************** */}
            <hr className="border mt-5 px-2 border-black" />

            <section className="Features-Container mt-5 border-green-800 ">
              <div className="px-4 py-2 gap-2 flex">
                <p className="bg-black text-white rounded-full  px-2 "> 5 </p>
                <h1 className="font-semibold"> Upload Files </h1>
              </div>

              <div className="Uploadfile-container rounded py-2 border border-grey">
                <div className="Uploadfile-box  px-2  flex flex-col sm:flex-row sm:justify-between   border-pink-800">
                  <div className=" sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Add Title *{" "}
                    </label>
                    <div className="py-2">
                      <input
                        onChange={handleInputChange}
                        name="title"
                        value={formData.title}
                        placeholder={
                          "Add a title for the uploaded file" || formData.title
                        }
                        className={`border-2 ${
                          errors["title"] ? "border-red-500" : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["title"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a Title
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:w-[50%] px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Upload Attachment*{" "}
                    </label>
                    <div className="py-2 relative">
                      <span className="absolute left-3 top-4">
                        <Image
                          src="assets/pdficon.svg"
                          alt="Icon"
                          width={20}
                          height={20}
                          className="m-auto"
                        />
                      </span>
                      <input
                        type="file"
                        name="fileUpload"
                        accept=".pdf"
                        onChange={(e) => handleImageChange(e, "location")}
                        placeholder="Click here to upload a file"
                        className="pl-8 border border-grey text-sm  rounded py-2 px-2 w-[100%]"
                      />
                    </div>
                    <p className="px-2 text-[.7rem] text-[#707070]">
                      {" "}
                      PDF file is supported{" "}
                    </p>
                  </div>
                </div>

                {/*** */}
              </div>
            </section>

            {/************* FAQ Questions **************** */}
            <hr className="border mt-5 px-2 border-black" />

            <section className="Features-Container mt-5 border-green-800 ">
              <div className="px-4 py-2 gap-2 flex">
                <p className="bg-black text-white rounded-full  px-2 "> 6 </p>
                <h1 className="font-semibold"> FAQs </h1>
              </div>

              <div className="Uploadfile-container rounded py-2 border border-grey">
                <div className="Uploadfile-box  px-2  flex flex-col  border-pink-800">
                  <div className="  px-2 border-green-700">
                    <label className="font-semibold text-sm">
                      Question 1 *{" "}
                    </label>
                    <div className="py-2">
                      <input
                        onChange={handleInputChange}
                        name="question"
                        value={formData.question}
                        placeholder={"Type questions here" || formData.question}
                        className={`border-2 ${
                          errors["question"] ? "border-red-500" : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["question"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a Questions
                        </p>
                      )}
                    </div>
                  </div>

                  <div className=" px-2 border-green-700">
                    <label className="font-semibold text-sm">Answer 1* </label>
                    <div className="py-2 relative">
                      <input
                        type="text"
                        name="answer"
                        onChange={handleInputChange}
                        value={formData.answer}
                        placeholder="Type answer here"
                        className={`border-2 ${
                          errors["answer"] ? "border-red-500" : "border-grey"
                        } text-sm rounded py-2 px-2 w-[100%]`}
                      />
                      {errors["answer"] && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a Answer
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/*** */}
              </div>
            </section>

            {/* {showHeading  && (
              <div
                onClick={handleCreateProject}
                className="w-[100%] py-2 m-auto flex justify-center items-center"
              >
                <button
                  type="submit"
                  className="cursor-pointer  text-center rounded bg-black py-2 px-6 text-white"
                >
                  {" "}
                  Add Projects{" "}
                </button>
              </div>
            )} */}

            {
              <div
                onClick={handleupdatedprojectadmin}
                className="w-[100%] py-2 m-auto flex justify-center items-center"
              >
                <button
                  type="submit"
                  className="cursor-pointer  text-center rounded bg-black py-2 px-6 text-white"
                >
                  {" "}
                  Save changes
                </button>
              </div>            }
              
          </div>
        </form>
      </div>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
    </>
  );
}
