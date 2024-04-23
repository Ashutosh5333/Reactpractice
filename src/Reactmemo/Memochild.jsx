import React from 'react'

const Memochild = React.memo(({name}) => {
        
    console.log("childmemooo")

  return (
    <div>
        
        Child memo {name}
    </div>
  )
})

export default Memochild