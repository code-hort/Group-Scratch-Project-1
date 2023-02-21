
import React from 'react';
import { Link } from 'react-router-dom';


export default function Nav({loggedIn, currUser, signout}) {
  return (
    <>
  
      <div className='flex bg-gradient-to-bl from-slate-900 via-gray-600 to-fuchsia-900 justify-between h-24 items-center px-24 outline-double outline-3 outline-offset-2  ... '>
        <Link
          className=' text-5xl font-extrabold ... w-1/4 text-white font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 ...'
          to='/'
        >
          codeHort
        </Link>
        {!loggedIn ?
        <div className='flex w-1/4 items-end justify-end gap-4 text-2xl font-extrabold ... w-1/4  font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500..'>
          <Link
            to='/login'
            className=' animate-pulse bg-indigo-500 shadow-lg shadow-indigo-500/50 text-2xl font-extrabold ...  font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-10 ......'
          >
            login
          </Link>
          <Link
            to='/signup'
            className='animate-pulse bg-indigo-500 shadow-lg shadow-indigo-500/50 text-2xl font-extrabold ... font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-10  ......'
          >
            signup
          </Link>
        </div>
        : 
        <div className='flex'>

          <div 
          className='mr-8 animate-pulse bg-indigo-500 shadow-lg shadow-indigo-500/50 text-2xl font-extrabold ...  font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-10 ......'
          >{`Hello, ${currUser.username}`}</div>

          <button
           className='animate-pulse bg-indigo-500 shadow-lg shadow-indigo-500/50 text-2xl font-extrabold ... font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-10  ......'
           onClick={()=>signout()} >Signout</button>
        </div>
        }
      </div>
    </>
  );
}

