import React from 'react';

export default function Signup({
  handleUsername,
  handlePassword,
  createUser,
  username,
  password,
  cohort,
  handleCohort,
}) {
  return (
    <>
      <div className='font-robotics mt-24 w-1/2 h-96 mx-auto border border-black flex flex-col items-center justify-center align-middle gap-4'>
        <div className='font-robotics text-2xl'>Create an Account</div>
        <input
          className='font-robotics text-center border border-blue-500 black w-48 '
          onChange={(e) => handleUsername(e)}
          value={username}
          placeholder='username'
          type='text'
        ></input>
        <input
          className='font-robotics text-center border border-blue-500 black w-48 '
          onChange={(e) => handlePassword(e)}
          value={password}
          placeholder='password'
          type='password'
        ></input>
        <input
          className='font-robotics text-center border border-blue-500 black w-48 '
          onChange={(e) => handleCohort(e)}
          value={cohort}
          placeholder='cohort only the numbers'
          type='number'
        ></input>

        <button
          className='font-robotics text-center cursor-pointer hover:bg-blue-200 hover:text-black bg-blue-600 text-white border black w-48 '
          onClick={() => createUser()}
        >
          Sign up
        </button>
      </div>
    </>
  );
}
