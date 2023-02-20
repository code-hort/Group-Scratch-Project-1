import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup";


export default function Nav(){



    return(

<>
    <div className="flex bg-blue-800 justify-between h-24 items-center px-24">
    <Link className=" w-1/4 text-white" to="/">codeHort</Link>
    <div className="flex w-1/4 items-end justify-end gap-4">
    <Link to="/login" className=" text-white">login</Link>
<Link to="/signup" className=" text-white">signup</Link>
    </div>



    </div>
</>


    )
}