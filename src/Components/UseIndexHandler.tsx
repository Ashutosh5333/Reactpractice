'use client';
import { useState } from "react";


const UseIndexHandler = (Interier: string | any[]) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? Interier.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === Interier.length - 1 ? 0 : prevIndex + 1
    );
  };

  return { activeIndex, handlePrev, handleNext };
};

export default UseIndexHandler;
