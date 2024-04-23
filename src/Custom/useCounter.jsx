import React, { useState } from 'react'

export const useCounter = () => {
    const [count ,SetCount] = useState(0)

    const Incresment = () =>{
          SetCount(count+1)
    }
     const Decreasement = () =>{
        SetCount(count-1)
     }


  return       [count,Incresment,Decreasement]

}
