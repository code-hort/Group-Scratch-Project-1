import React, { useState } from 'react'
import FormField from './FormField.jsx'

const Home = ({ allCohorts }) => {
  const [chosenCohort, setChosenCohort] = useState('')

  const handleClickedCohort = (id) => {
    const chosenCohort = allCohorts.filter(obj => obj._id === id)
    setChosenCohort(chosenCohort)
  }
// const handleChooseParticpant = (id) =>{
  
// }




  let students;
  if (chosenCohort) {
    console.log(chosenCohort[0].students)
    students = chosenCohort[0].students.map(obj => {
      return (
        <div>

          <div 
          key={obj._id}
          className="bg-slate-300 rounded  w-min-24 max-w-fit h-24 hover:bg-slate-500 border border-black"
          
          >
            <h1 className='text-xl'>{obj.username}</h1>
            <div className='text-md'>{obj.cohort}</div>
            <div>{obj.participation}</div>
          </div>
          {/* <button onClick={handleChooseParticpant}>Choose Participant</button> */}
        </div>


      )
    })
  }




  const cohort = allCohorts.map(obj => <div
    className='cursor-pointer bg-blue-500 hover:bg-blue-300 hover:text-black w-fit p-4 border border-black m-2'
    onClick={() => handleClickedCohort(obj._id)}
    id={obj._id}
  >{`Cohort ${obj.cohort}`}
  </div>)

  return (
    <>

      {cohort}
      {students ?
        students :
        null}
    </>



  )
}

export default Home