import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Usecall from "./Components/Usecall";
import Parentcall from "./Components/Parentcall";
import {data} from "./context/index"

function Daterange() {
  const [selectedData, setSelectedData] = useState(data);
  const defaultStartDate = data[0]?.date;
  const defaultEndDate = data[data.length - 1]?.date;
  
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  useEffect(() => {
    handleDateRangeChange(startDate, endDate);
  }, [startDate, endDate]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleDateRangeChange = (startDate ,endDate) => {
    // console.log("startDate+++++++++++++", startDate);
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0); 
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= end;
    });
    console.log("filteredData", filteredData);
    setSelectedData(filteredData);
  };
  


  return (
    <>
    <h1> Hello </h1>
    <div className="w-[100%] py-2 pb-2 sm:w-[80%] lg:w-[50%] m-auto flex sm:px-4 flex-col sm:flex-row mt-6 items-center gap-2 space-x-2 sm:space-x-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="startDate" className="text-sm sm:text-md text-gray-600">Start Date :</label>
        <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} className="border text-gray-600 border-gray-300 rounded-md px-2 py-1" />
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="endDate" className="text-sm  sm:text-md text-gray-600">End Date :</label>
        <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} className="border text-gray-600  border-gray-300 rounded-md px-2 py-1" />
      </div>
    </div>
    </>
  );
}

export default Daterange;
