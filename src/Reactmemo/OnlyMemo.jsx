import React, { useState } from 'react'
import Memochild from './Memochild';


const OnlyMemo = () => {
    const [name, setName] = useState('Alice');
    const [count,Setcount] = useState(0);

    const handleclick = () =>{
         console.log("hello")
    }
     
    
      
  return (
    <div>
        <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      
      <Memochild name={name} />

      <button onClick={handleclick} >hello  </button>
      <button onClick={()=>Setcount(count+1)} >Count {count}  </button>
    </div>
  )
}

export default OnlyMemo