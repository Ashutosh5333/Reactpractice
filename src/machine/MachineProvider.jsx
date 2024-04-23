import React, { Children, createContext, useState } from 'react'




 export const AppContext = createContext()


const MachineProvider = ({children}) => {
      const [count,SetCount] =useState(0)


  return (
    <AppContext.Provider  value={{count}}>
             {children}
    </AppContext.Provider>
  )
}

export default MachineProvider