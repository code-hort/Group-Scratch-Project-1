import React, { useEffect, useState } from 'react'

const Home = ({ allCohorts, getAllCohorts }) => {
  const [chosenCohort, setChosenCohort] = useState('')
  const [studentsArray, setStudentsArray] = useState('')
  const [openStudentsArray, setOpenStudentsArray] = useState(false)
  const [newCohort, setNewCohort] = useState('')
  const [chosenStudent, setChosenStudent] = useState('')


  const handleNewCohort = (e) => {
    setNewCohort(e.target.value)
    console.log(newCohort)
  }

  const createNewCohort = async () => {
    console.log("about to create new cohort")
    let res = await fetch('cohort/newcohort', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({
        cohort: newCohort
      })
    })
    res = await res.json();
    console.log("create response ", res)

    getAllCohorts()
  }

  useEffect(() => {
    getAllCohorts()
  }, [studentsArray, chosenCohort])

  const handleClickedCohort = (id) => {
    const chosenCohort = allCohorts.filter(obj => {
      return obj._id === id
    })
    setChosenCohort(chosenCohort[0])
    let students = chosenCohort[0].students.map(obj => {
      return (
        <div
        key={obj._id}
        className="bg-gradient-to-br from-green-400 to-blue-500 rounded min-w-fit w-48  h-fit hover:from-pink-500 hover:to-yellow-500 border border-black shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80"
      >
        <h1 className='text-2xl'>{`User: ${obj.username}`}</h1>
        <div className='text-xl'>{`Cohort ${obj.cohort}`}</div>
        <div>{`Participation Points: ${obj.participation}`}</div>
      </div>

      )
    })
    setOpenStudentsArray(prev => !prev)
    console.log(openStudentsArray)
    setStudentsArray(students)
  }
  const handleCohortReset = async () => {

    let res = await fetch(`cohort/resetcohort/${chosenCohort.cohort}`,
      {
        method: 'PATCH',
        redirect: 'follow'
      }
    )
    res = await res.json();
    setChosenCohort(res.cohort)
    setStudentsArray('')
    setOpenStudentsArray(false)
    setChosenStudent('')
  }

  const handleChooseParticpant = async () => {
    const randomNum = Math.floor(Math.random() * (studentsArray.length - 1))
    const student = chosenCohort.students[randomNum].username
    let res = await fetch(`/cohort/chosenuser/${chosenCohort.cohort}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({
        username: student,
      })
    })
    res = await res.json();
    setChosenCohort(res.cohort)
    let students = res.cohort.students.map(obj => {
      return (
     
        // <div
        //   key={obj._id}
        //   className="bg-slate-300 rounded min-w-fit w-48  h-fit hover:bg-slate-500 border border-black"
        // >
        //   <h1 className='text-2xl'>{`User: ${obj.username}`}</h1>
        //   <div className='text-xl'>{`Cohort ${obj.cohort}`}</div>
        //   <div>{`Participation Points: ${obj.participation}`}</div>
        // </div>
<div
  key={obj._id}
  className="bg-gradient-to-br from-green-400 to-blue-500 rounded min-w-fit w-48  h-fit hover:from-pink-500 hover:to-yellow-500 border border-black shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80"
>
  <h1 className='text-2xl'>{`User: ${obj.username}`}</h1>
  <div className='text-xl'>{`Cohort ${obj.cohort}`}</div>
  <div>{`Participation Points: ${obj.participation}`}</div>
</div>


    
      )
    })
    setStudentsArray(students)
    setChosenStudent(res.user)
  }



  const cohort = allCohorts.map((obj) => (
    <div
      className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 text-white text-center font-medium rounded-md px-4 py-2 m-2 transition duration-300 ease-in-out"
      onClick={() => handleClickedCohort(obj._id)}
      key={obj._id}
    >
      {`Cohort ${obj.cohort}`}
    </div>
  ));
  

  return (

<div className='w-screen'>
  <div className='flex justify-between items-center px-6 py-4 bg-gray-100'>
    <div>
      <button
        className='inline-block px-6 py-3 mr-4 font-medium text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-full shadow-lg focus:outline-none'
        onClick={handleChooseParticpant}>Choose Participant</button>
      <button
        className='inline-block px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-md shadow-lg hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800'
        onClick={handleCohortReset}>Reset</button>
    </div>
    {/* {chosenStudent && <div className='mx-auto w-1/2 h-24 text-center bg-red-400 text-4xl leading-24'>{chosenStudent.username}</div>} */}
    

    {chosenStudent && 
  <div className='mx-auto w-1/3 p-8 text-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md'>
    <h2 className='text-4xl text-white mb-4'>{chosenStudent.username}</h2>
    <p className='text-xl text-white'>{`Cohort ${chosenStudent.cohort}`}</p>
    <p className='text-lg text-white'>{`Participation Points: ${chosenStudent.participation}`}</p>
  </div>
}
<div>
      <input className='w-48 p-2 border border-gray-400 rounded-md shadow-lg focus:outline-none' value={newCohort} onChange={(e) => handleNewCohort(e)} placeholder='Enter new cohort name' />
      <button className='inline-block px-6 py-3 ml-4 font-medium text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-full shadow-lg focus:outline-none' onClick={createNewCohort}>Create new cohort</button>
    </div>
  </div>
  <div className='flex flex-wrap justify-center mt-6'>{cohort}</div>
  <div className='flex justify-center mt-6 gap-4'>{openStudentsArray && studentsArray}</div>
</div>





    // </div>


  )
}

export default Home