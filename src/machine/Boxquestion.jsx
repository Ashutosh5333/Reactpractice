import React, { useState } from 'react'

import "./box.css"

const Boxquestion = () => {
    const [boxes, setBoxes] = useState(Array(7).fill('yellow'));
    const [clickedBoxes, setClickedBoxes] = useState([]);
      
    
    const changeColor = (index) => {
        if (boxes[index] !== 'green') {
          let updatedBoxes = [...boxes];
          updatedBoxes[index] = 'green';
          setBoxes(updatedBoxes);
          setClickedBoxes([...clickedBoxes, index]);
        }
        checkAllGreen();
      } ;
    
      const checkAllGreen = () => {
        if (clickedBoxes.length === 7) {
          setTimeout(() => {
            revertColors(0);
          }, 1000);
        }
      };
  
    const revertColors = (index) => {
        if (index < clickedBoxes.length) {
          let updatedBoxes = [...boxes];
          updatedBoxes[clickedBoxes[index]] = 'yellow';
          setBoxes(updatedBoxes);
          setTimeout(() => {
            revertColors(index + 1);
          }, 1000);
        }
      } ;

  return (
    <>
    <div className="App">
      {boxes.map((color, index) => (
        <div
          key={index}
          className="box"
          style={{ backgroundColor: color }}
          onClick={() => changeColor(index)}
        ></div>
      ))}
    </div>
    </>
  )
}

export default Boxquestion