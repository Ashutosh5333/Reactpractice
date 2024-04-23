import { useState } from "react";

export const MyComponent = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const fetchData = async () => {
      try {
        const response = await fetch('https://akestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        const result = await response.json();
        console.log("ress",result)
        setData(result);
      } catch (error) {
        throw new Error('Failed to fetch data');
        // setError(error);
      }
    };
  
    return (
      <div>
        <button onClick={fetchData}>Fetch Data</button>
        <ul>
          {data && data.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  };