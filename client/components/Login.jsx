import React from "react";

export default function Login({
  username,
  password,
  handlePassword,
  handleUsername,
  login,
}) {
  return (
    <>
      <div className="mt-24 w-1/2 h-96 mx-auto border border-black flex flex-col items-center justify-center align-middle gap-4 bg-gradient-to-bl from-slate-900 via-gray-600 to-fuchsia-900 h-24 items-center px-24 outline-double outline-3 outline-offset-2 ">
        <div className="font-robotics text-2xl">Log In</div>
        <input
          className="text-center border border-blue-500 black w-48 font-robotics"
          onChange={(e) => handleUsername(e)}
          value={username}
          placeholder="username"
          type="text"
        ></input>
        <input
          className="text-center border border-blue-500 black w-48 font-robotics"
          onChange={(e) => handlePassword(e)}
          value={password}
          placeholder="password"
          type="password"
        ></input>
        <button
          className="text-center cursor-pointer hover:bg-blue-200 hover:text-black bg-blue-600 text-white border black w-48 font-robotics"
          onClick={() => login()}
        >
          Log in
        </button>
      </div>
    </>
  );
}

// const RenderCohorts = ({data}) => {
//   if(data?.length > 0) {
//       return data.map((cohort) => <Cohort key={cohort._id}{...cohort} />)
//   }
// }

// const renderGenerator = (e) => { 'render the random generator on to the rightside' }

// const handleCohort = (e) => { 'add new cohort to database?' }

// const handleStudent = (e) => { 'add new student to database'}
