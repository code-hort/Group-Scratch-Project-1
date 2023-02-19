import React from 'react'
import Cohort from './Cohort.jsx'





export default function Login ({ username, password, handlePassword, handleUsername, login }) {


  return (
    <>
      <div className="flex flex-wrap box-border h-100 w-50 p-4 border-4 rounded" >login</div>
      <input onChange={(e) => handleUsername(e)} value={username} placeholder="username" type="text"></input>
      <input onChange={(e) => handlePassword(e)} value={password} placeholder="password" type="password"></input>
      <button onClick={() => login()}>sign up</button>
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