
import React from 'react'


export default function Signup({handleUsername, handlePassword, createUser, username, password}){
return(
    <>
    <input onChange={(e)=>handleUsername(e)} value={username} placeholder="username" type="text"></input>
    <input onChange={(e)=>handlePassword(e)} value={password} placeholder="password" type="password"></input>
    <button onClick={()=>createUser()}>sign up</button>
</>

        
)
}