import React, { useState, useEffect } from 'react';

const ButtonBackground = () => {
  const [buttonStates, setButtonStates] = useState(Array(6).fill());
  const [isActive,SetisActive] = useState(0)

  const handleBackground = (index) => {
    if (isActive === index) {
      SetisActive(null);
    } else {
      SetisActive(index);
    }
  };
  
  return (
    <div>
          {buttonStates.map((el, index) => (
            //  console.log("el" ,el)
        <button
          key={index}
          onClick={() => handleBackground(index)}
         
          className={index === isActive ? 'bg-primary' : ''}
        >
          Button {index + 1}
        </button>
      ))}

    </div>
  );
};

export default ButtonBackground;







// import React, { useState } from 'react'

// const ButtonBackground = () => {
//    const [state,Setstate] = useState(null)


//     const handlebackgorund = (i) =>{
//         console.log(i)
//          setTimeout(()=>{
//           Setstate(i)
//          },1000)
       
//     }


//   return (
//     <div>
//       <button onClick={()=> handlebackgorund(0)}
//        className={`${state ===0 ? "bg-primary" :""} `}
//       > buttton 1 </button>
//       <button onClick={()=> handlebackgorund(1)}
//         className={`${state ===1 ? "bg-primary" :""} `}
//       > buttton 2 </button>
//       <button onClick={()=> handlebackgorund(2)}
//         className={`${state ===2 ? "bg-primary" :""} `}
//       > buttton 3 </button>
//       <button onClick={()=> handlebackgorund(3)}
//         className={`${state ===3 ? "bg-primary" :""} `}
//       > buttton 4 </button>
//       <button onClick={()=> handlebackgorund(4)}> buttton 5 </button>
//       <button onClick={()=> handlebackgorund(5)}> buttton 6 </button>
        
//      </div>
//   )
// }

// export default ButtonBackground