import React, { useEffect, useState } from 'react'
import Progressivebar from './Progressivebar'

const MainProgress = () => {
  const [progress,setProgress]=useState(0)



  useEffect(()=>{
    const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress < 1 ? prevProgress + 0.1 : 1));
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };

  },[])


  return (
    <div>
        <h1>MainProgress </h1>
        <Progressivebar width={300} height={30} progress={progress} />

    </div>
  )
}

export default MainProgress