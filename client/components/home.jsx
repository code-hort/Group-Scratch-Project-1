import React, { useEffect, useState } from 'react'

const Home = ({ allCohorts, getAllCohorts }) => {
  const [chosenCohort, setChosenCohort] = useState('')
  const [studentsArray, setStudentsArray] = useState('')
  const [openStudentsArray, setOpenStudentsArray] = useState(false)
  const [newCohort, setNewCohort] = useState('')


  const handleNewCohort =(e)=>{
    setNewCohort(e.target.value)
    console.log(newCohort)
  }

  const createNewCohort = async ()=> {
console.log("about to create new cohort")
    let res= await fetch('cohort/newcohort',{
      method:'POST',
     headers: {
      'Content-Type': 'Application/JSON'
     },
     body:JSON.stringify({
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
            className="bg-slate-300 rounded  w-min-24 max-w-fit h-24 hover:bg-slate-500 border border-black"
          >
            <h1 className='text-xl'>{obj.username}</h1>
            <div className='text-md'>{obj.cohort}</div>
            <div>{obj.participation}</div>
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
      {openStudentsArray
        ?
        studentsArray

        :
        null}
        
      <button className='font-robotics bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ... br-5 rounded-full px-6 py-5' onClick={handleChooseParticpant}>Choose Participant</button>
      
      <button className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-md text-sm px-3 py-2.5 text-center mr-2 mb-2' onClick={handleCohortReset}>reset</button>
<input className='border border-black w- 24 h-fit ' value={newCohort} onChange={(e)=>handleNewCohort(e)} />
<button onClick={createNewCohort}>create new cohort</button>
    </>


  )
}

export default Home