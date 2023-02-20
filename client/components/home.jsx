import React, { useEffect, useState } from 'react'

import FormField from './FormField.jsx'

const Home = ({ allCohorts, getAllCohorts }) => {
  const [chosenCohort, setChosenCohort] = useState('')
  const [studentsArray, setStudentsArray] = useState('')


  useEffect(() => {
    console.log("use effect students array", studentsArray)
    getAllCohorts()
  }, [studentsArray])


  const handleClickedCohort = (id) => {

    const chosenCohort = allCohorts.filter(obj => {

      return obj._id === id
    })

    setChosenCohort(chosenCohort[0])


    let students = chosenCohort[0].students.map(obj => {

      return (
        <>
          <div
            key={obj._id}
            className="bg-slate-300 rounded  w-min-24 max-w-fit h-24 hover:bg-slate-500 border border-black"
          >
            <h1 className='text-xl'>{obj.username}</h1>
            <div className='text-md'>{obj.cohort}</div>
            <div>{obj.participation}</div>
          </div>
        </>
      )
    })

    setStudentsArray(students)
  }
  const handleChooseParticpant = async () => {
    const randomNum = Math.floor(Math.random() * (studentsArray.length - 1))
    const student = chosenCohort.students[randomNum].username
    let res = await fetch(`/cohort/chosenUser/${chosenCohort.cohort}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({
        username: student,
      })
    })
    res = await res.json();
    setChosenCohort(res)
    let students = res.students.map(obj => {
      return (
        <>
          <div key={obj._id}
            className="bg-slate-300 rounded  w-min-24 max-w-fit h-24 hover:bg-slate-500 border border-black"
          >
            <h1 className='text-xl'>{obj.username}</h1>
            <div className='text-md'>{obj.cohort}</div>
            <div>{obj.participation}</div>
          </div>

        </>

      )
    })
    setStudentsArray(students)
  }

  const cohort = allCohorts.map(obj => <div
    className='cursor-pointer bg-blue-500 hover:bg-blue-300 hover:text-black w-fit p-4 border border-black m-2'
    onClick={() => handleClickedCohort(obj._id)}
    key={obj._id}
  >{`Cohort ${obj.cohort}`}
  </div>)

  return (
    <>
      {cohort}
      {studentsArray
        ?
        studentsArray

        :
        null}
      <button onClick={handleChooseParticpant}>Choose Participant</button>
    </>


  )
}

export default Home