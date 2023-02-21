import React from "react";
import { Link } from "react-router-dom";



export default function Nav({currUser,signout}) {



    return (

        <>
            <div className="flex bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ... bg-cyan-500 shadow-lg shadow-cyan-500/50 ... justify-between h-24 items-center px-24 outline-double outline-3 outline-offset-2 ... ">
                <Link className=" w-1/4 text-white" to="/">codeHort</Link>
                {!currUser &&     <div className="flex w-1/4 items-end justify-end gap-4">
                    <Link to="/login" className=" text-white">login</Link>
                    <Link to="/signup" className=" text-white">signup</Link>
                </div>}
                {currUser && (
                    <>

                    <div className="text-white">{`Hello ${currUser.username}`}</div>
                    <div onClick={signout} className="border text-white">signout</div>

                    </>
                )}
            



            </div>
        </>


    )
}