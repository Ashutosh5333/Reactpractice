import React, { useEffect, useState } from 'react'

const Progressivebar = ({width,height,progress}) => {
const [barWidth, SetbarWidth]=useState(0)

//   console.log(progress,"progresss")

// console.log("widthbar",barWidth)

useEffect(() => {
    SetbarWidth(progress * width);
  }, [progress, width]);


  return (
    <div style={{ width, height, border: '1px solid black', }}>
      <div
        style={{
          width: barWidth,
          height: '100%',
          backgroundColor: 'green',
          top: 0,
          left: 0,
        }}
      />
    </div>
  )
}

export default Progressivebar