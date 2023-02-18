import React, { useEffect, useState } from "react"
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
// import FormField from "./FormField.jsx"

import Userlogin from "../pages/userlogin.jsx"
import Home from "../pages/home.jsx"

const App = () => {

   const onClick = (e) => {}
   
  return (
    <BrowserRouter>
        <header className="w-full flex justify-between items-center bg-[#C0C0C0]">
            <Link to ="/userlogin">
                Title
            </Link>
            </header>
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/userlogin" element={<Userlogin/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

// function App(){
//     const responseMessage = (response) => {

//         console.log(response);
//     };
//     const errorMessage = (error) => {
//         console.log(error);
//     };
//     return (
//         <div>
//             <h2>React Google Login</h2>
//             <br />
//             <br />
//             <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
//         </div>
//     )
// }