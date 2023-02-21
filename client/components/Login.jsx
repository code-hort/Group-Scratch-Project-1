import React from 'react'






export default function Login ({ username, password, handlePassword, handleUsername, login }) {


  return (
    <>
     <div className="mt-24 w-1/2 h-96 mx-auto border border-black flex flex-col items-center justify-center align-middle gap-4">



      <div className='text-2xl'>Log In</div>
      <input  className="text-center border border-blue-500 black w-48 " onChange={(e) => handleUsername(e)} value={username} placeholder="username" type="text"></input>
      <input  className="text-center border border-blue-500 black w-48 " onChange={(e) => handlePassword(e)} value={password} placeholder="password" type="password"></input>
      <button className="text-center cursor-pointer hover:bg-blue-200 hover:text-black bg-blue-600 text-white border black w-48 "  onClick={() => login()}>Log in</button>


      
     </div>
    </>
  )
}






// const RenderCohorts = ({data}) => {
//   if(data?.length > 0) {
//       return data.map((cohort) => <Cohort key={cohort._id}{...cohort} />)
//   }
// }

// const renderGenerator = (e) => { 'render the random generator on to the rightside' }

// const handleCohort = (e) => { 'add new cohort to database?' }

// const handleStudent = (e) => { 'add new student to database'}