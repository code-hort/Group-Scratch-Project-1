import React, { useEffect, useState } from "react"

export default function(){
const [data,setData] = useState()


useEffect(()=>{
 async function getData(){
    const URL = "https://api.nasa.gov/planetary/apod?api_key=1P1b8Piz7bF1EEcYrkHoCJBmsSZXKVjmHwuHOZFd";
   
    let res = await fetch(URL,
        {
        method: 'GET'
    })
    res = await res.json();
    console.log(res) 
    setData(res);
 }
 getData();
},[])

if(!data)return <div>loading</div>
return( 
<>
<div className="bg-black flex flex-col items-center justify-center w-screen h-screen">
<h1 className="text-white text-4xl">Hello world</h1>
<img className="w-1/2 h-3/4" src={`${data.url}`}></img>
</div>

</>

    )
}