
import React from 'react'


export default function Signup({handleUsername, handlePassword, createUser, username, password}){
return(
    <>

<div className="mt-24 w-1/2 h-96 mx-auto border border-black flex flex-col items-center justify-center align-middle gap-4">
     <div className='text-2xl' >Create an Account</div>
      <input  className="text-center border border-blue-500 black w-48 " onChange={(e) => handleUsername(e)} value={username} placeholder="username" type="text"></input>
      <input  className="text-center border border-blue-500 black w-48 " onChange={(e) => handlePassword(e)} value={password} placeholder="password" type="password"></input>
      <button className="text-center cursor-pointer hover:bg-blue-200 hover:text-black bg-blue-600 text-white border black w-48 "  onClick={() => login()}>Log in</button>

</div>
</>

        
)
}