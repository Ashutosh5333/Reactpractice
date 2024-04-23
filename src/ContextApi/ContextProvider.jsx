import React, { createContext, useState } from 'react'


export const Appcontext = createContext()


const ContextProvider = ({children}) => {
      const [data,SetData] = useState(2)
      
      const handleincrese = () =>{
             SetData(data+1)
      }


  return (
    <Appcontext.Provider value={{data ,handleincrese}} >
          {children}
    </Appcontext.Provider>
  )
}

export default ContextProvider