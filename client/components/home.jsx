import React, { useEffect, useState } from 'react';
import PopupModal from './PopupModal';


const Home = ({ allCohorts, getAllCohorts, createUser, getOneStudent }) => {
  const [chosenCohort, setChosenCohort] = useState('')
  const [studentsArray, setStudentsArray] = useState('')
  const [openStudentsArray, setOpenStudentsArray] = useState(false)
  const [newCohort, setNewCohort] = useState('')
  const [chosenStudent, setChosenStudent] = useState('')
  const [newStudent, setNewStudent] = useState('')
  const [newStudentCohort, setNewStudentCohort] = useState('')

  const handleNewStudent = (e) => {
    setNewStudent(e.target.value);
    console.log(newStudent);
  };

  const handleNewStudentCohort = (e) => {
    setNewStudentCohort(e.target.value);
    console.log(newStudentCohort);
  };

  const handleNewCohort = (e) => {
    setNewCohort(e.target.value);
    console.log(newCohort);
  };

  const createNewStudent = async () => {
    console.log("about to create new student");
    fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        username: newStudent,
        password: "password",
        cohort: newStudentCohort,
      }),
    }).then((res) => res.json());
    console.log("create response", res);
    getAllCohorts();
  };

  const createNewCohort = async () => {
    console.log("about to create new cohort");
    let res = await fetch("cohort/newcohort", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        cohort: newCohort,
      }),
    });
    res = await res.json();
    console.log("create response ", res);

    getAllCohorts();
  };

  useEffect(() => {
    getAllCohorts();
  }, [studentsArray, chosenCohort, allCohorts]);

  const handleClickedCohort = (id) => {
    const chosenCohort = allCohorts.filter((obj) => {
      return obj._id === id;
    });
    setChosenCohort(chosenCohort[0]);
    let students = chosenCohort[0].students.map((obj) => {
      return (

        <div key={obj._id}
        className="font-robotics bg-gradient-to-bl w-48 h-24 text-white from-slate-900 via-gray-600 to-fuchsia-900 rounded   hover:bg-slate-500 border border-black"
        onClick={(e) => handleStudentClicked(e)}
      >
        <h1 className='text-2xl'>{obj.username}</h1>
        <div className='text-md'>{obj.cohort}</div>
        <div>{obj.participation}</div>
      </div>
    
      )

    })
    setOpenStudentsArray(prev => !prev)
    console.log(openStudentsArray)
    setStudentsArray(students)
  }

  const handleStudentClicked = (e) => {
    console.log(e.target.firstChild.textContent);
    getOneStudent(e.target.firstChild.textContent);
  }

  const handleCohortReset = async () => {
    let res = await fetch(`cohort/resetcohort/${chosenCohort.cohort}`, {
      method: "PATCH",
      redirect: "follow",
    });
    res = await res.json();
    setChosenCohort(res.cohort);
    setStudentsArray("");
    setOpenStudentsArray(false);
    setChosenStudent("");
  };

  const handleChooseParticpant = async () => {
    const randomNum = Math.floor(Math.random() * (studentsArray.length - 1));
    const student = chosenCohort.students[randomNum].username;
    let res = await fetch(`/cohort/chosenuser/${chosenCohort.cohort}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        username: student,
      }),
    });
    res = await res.json();
    setChosenCohort(res.cohort);
    let students = res.cohort.students.map((obj) => {
      return (
        <div key={obj._id}
        className="font-robotics bg-gradient-to-bl w-48 h-24 text-white from-slate-900 via-gray-600 to-fuchsia-900 rounded   hover:bg-slate-500 border border-black"

      >
        <h1 className='text-2xl'>{obj.username}</h1>
        <div className='text-md'>{obj.cohort}</div>
        <div>{obj.participation}</div>
      </div>
      )
    })
    setStudentsArray(students)
    setChosenStudent(res.user)
  }


  const cohort = allCohorts.map(obj => <div
    className='cursor-pointer rounded-br-lg bg-gradient-to-bl from-fuchsia-900 via-gray-600 to-fuchsia-900 hover:bg-indigo-500 shadow-lg shadow-indigo-500/50 text-2xl font-extrabold ...text-white font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500... hover:text-black w-fit p-4 border border-black  hover:shadow-[0_4px_0px_rgb(222, 111, 12)] text-indigo bg-white ease-out hover:translate-y-1 transition-all rounded">
    hover effect 1'
      onClick={() => handleClickedCohort(obj._id)}
      key={obj._id}
    >
      {`Cohort ${obj.cohort}`}
    </div>
  );

  return (
    <div>
      <div className="flex justify-between my-8 mx-24">
        <div>
          <div className="flex items-end justify-end gap-4 text-2xl font-extrabold font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            <button
              className=" bg-indigo-900 hover:bg-indigo-800 shadow-lg text-white py-2 px-4 rounded transition duration-300 ease-in-out"
              onClick={handleChooseParticpant}
            >
              Choose participant
            </button>
            <button
              className=" bg-indigo-800 hover:bg-indigo-700 shadow-lg text-white py-2 px-4 rounded transition duration-300 ease-in-out"
              onClick={handleCohortReset}
            >
              Reset
            </button>
          </div>
        </div>

        {chosenStudent && (
          <div className="border border-indigo-800 border-4 rounded-xl">
            <div className="text-6xl animate-pulse font-extrabold font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              {`${chosenStudent.username}`}
            </div>
            <div className="animate-pulse text-2xl font-extrabold font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              {`Cohort: ${chosenStudent.cohort}`}
            </div>
            <div className="animate-pulse text-2xl font-extrabold font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              {`Participation points: ${chosenStudent.participation}`}
            </div>
          </div>
        )}

        <div>
          <input
            type="number"
            className="font-robotics border border-black px-2 py-1 rounded-lg mr-2"
            value={newCohort}
            onChange={(e) => handleNewCohort(e)}
          />
          <button
            className="font-robotics bg-indigo-900 hover:bg-indigo-800 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
            onClick={createNewCohort}
          >
            Create new cohort
          </button>
        </div>
      </div>

      <div className="mt-8 gap-2 flex justify-center">{cohort}</div>

      <div className="mx-18 mt-8 gap-2 flex  flex-wrap justify-center">
        {openStudentsArray ? studentsArray : null}
      </div>
      <div className="text-center mr-8 mt-8">
        <input
          placeholder="first and last name"
          className="font-robotics border border-black px-2 py-1 rounded-lg mr-2"
          value={newStudent}
          onChange={(e) => handleNewStudent(e)}
        />
        <input
          placeholder="cohort"
          type="number"
          className="font-robotics border border-black px-2 py-1 rounded-lg mr-2"
          value={newStudentCohort}
          onChange={(e) => handleNewStudentCohort(e)}
        />
        <button
          className="font-robotics bg-indigo-900 hover:bg-indigo-800 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
          onClick={createNewStudent}
        >
          Add student
        </button>
      </div>
    </div>
  );
};

export default Home;
