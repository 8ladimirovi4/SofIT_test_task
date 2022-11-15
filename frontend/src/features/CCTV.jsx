import { useEffect } from 'react'
import {React, useState, useRef} from 'react'




function CCTV() {
const [getId, setGetId] = useState(2)
const [getInfo, setGetInfo] = useState({})
const [getImage, setGetImage] = useState({})



function getIdPlus () {
  setGetId(prev => prev + 1)
}

function getIdMinus () {
  setGetId(prev => prev - 1)
  if (getId < 2) {
    setGetId(2)
  }
}


  async function FetchFunc () {
    const response = await fetch(`http://localhost:3001/img`, {
     method: 'POST',
     body: JSON.stringify({
     id: getId,
     }),
     headers: { "Content-Type": "application/json" },
   }) 
   const data = await response.json()
   setGetImage(data)
     }
console.log(getImage.img);



     useEffect(() => {
      async function getInfo () {
  const response =  await fetch ('http://localhost:3001/data', {
    method: 'POST',
     body: JSON.stringify({
     id: getId,
     }),
     headers: { "Content-Type": "application/json" },
  })
  const data = await response.json()
  setGetInfo(JSON.parse(data.trace));
      }
      getInfo () 
     },[getId])
     console.log(getInfo);

  return (
    <div>
      <h1>CCTV</h1>
      { getId >= 2 ? 
      <>
      <button onClick={() => {FetchFunc();getIdMinus()}}>back</button>
        <button onClick={() => {FetchFunc();getIdPlus()}}>forward</button>
        <br/>  
        <img src={`http://localhost:3001/img/${getId}`} alt='ops' width='600'/> 
        
        
        </>
:
        <>
        <button>back</button>
        <button onClick={() => {FetchFunc();getIdPlus()}}>forward</button>
        <br/>  
        <img src={`http://localhost:3001/img/${getId}`} alt='ops' width='600'/> 
        </>
      }
       <p>{getInfo && getInfo.timestamp}</p>
    </div>
  )
}

export default CCTV
