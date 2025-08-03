import React from 'react'

const PraticeExample = () => {
    const [count, setCount] = React.useState(0);

    const [value, setValue] = React.useState(0);


    React.useEffect(() => {
        setValue(value + 1);
      }, []);

    // React.useEffect(() => {
    //     const interval = setInterval(() => setCount(c => c + 1), 1000);
    //     return () => clearInterval(interval);
    //   }, []);
      
  return (
    <div>
        <div>{count}</div>;
        <h2> {value} </h2>
        {/* <button onClick={() => setCount(count + 1)}>Increment</button>; */}
    </div>
  )
}

export default PraticeExample