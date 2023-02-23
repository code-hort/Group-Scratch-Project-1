import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import audio from '../assets/wheel_sfx.mp3';
import CircularProgress from '@mui/material/CircularProgress';
import Wheel from './Wheel.js'

const Home = ({ allCohorts, getAllCohorts, createUser, userAdmin }) => {
  const [chosenCohort, setChosenCohort] = useState('');
  const [studentsArray, setStudentsArray] = useState('');
  const [openStudentsArray, setOpenStudentsArray] = useState(false);
  const [newCohort, setNewCohort] = useState('');
  const [chosenStudent, setChosenStudent] = useState('');
  const [chosenArray, setChosenArray] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState('');
  const [randomNum, setRandomNum] = React.useState(0)
  const [animationClass, setAnimationClass] = React.useState('')
  const [wheelChose, setWheelChose] = React.useState('');


  const playWheel = () => {
    new Audio(audio).play();
  };

  const handleNewCohort = (e) => {
    setNewCohort(e.target.value);
    console.log(newCohort);
  };

  const deleteSelectedStudent = async (deleteStudent, cohort) => {
    try {
      const response = await fetch(`/user/delete/${cohort}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({
          username: deleteStudent,
        }),
      });
      const parsedResponse = await response.json();
      let students = parsedResponse.students.map((obj) => {
        if (userAdmin) {
          return (
            <div
              key={obj._id}
              className="font-robotics hover:text-yellow-500 hover:translate-y-1 bg-gradient-to-bl w-48 h-28 text-white from-slate-900 via-gray-600 to-fuchsia-900 rounded cursor-pointer hover:bg-slate-500 border border-black"
              onClick={() => {
                handleVolunteer(obj.username, obj.cohort);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3 fill-red-500 relative left-44 top-1 cursor-pointer"
                onClick={() => deleteSelectedStudent(obj.username, obj.cohort)}
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
              <h1 className="text-2xl">{obj.username}</h1>
              <p className="text-md">{obj.cohort}</p>
              <p>{obj.participation}</p>
            </div>
          );
        } else {
          return (
            <div
              key={obj._id}
              className="font-robotics bg-gradient-to-bl w-48 h-28 text-white from-slate-900 via-gray-600 to-fuchsia-900 rounded hover:bg-slate-500 border border-black"
            >
              <h1 className="text-2xl">{obj.username}</h1>
              <p className="text-md">{obj.cohort}</p>
              <p>{obj.participation}</p>
            </div>
          );
        }
      });
      setChosenCohort(parsedResponse);
      setStudentsArray(students);
      setChosenArray(parsedResponse.chosen);
    } catch (err) {
      console.log('Error in deleting selected student');
    }
  };

  const createNewCohort = async () => {
    console.log('about to create new cohort');
    let res = await fetch('cohort/newcohort', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        cohort: newCohort,
      }),
    });
    res = await res.json();
    getAllCohorts();
  };

  useEffect(() => {
    getAllCohorts();
  }, []);
  // studentsArray, chosenCohort,allCohorts

  const handleClickedCohort = (id) => {
    getAllCohorts();
    const chosenCohort = allCohorts.filter((obj) => {
      return obj._id === id;
    });
    setChosenStudent('');
    setChosenCohort(chosenCohort[0]);
    let students = chosenCohort[0].students.map((obj) => {
      if (userAdmin) {
        return (
          <div
            key={obj._id}
            className="font-robotics hover:text-yellow-500 hover:translate-y-1 bg-gradient-to-bl w-48 h-28 text-white from-slate-900 via-gray-600 to-fuchsia-900 rounded cursor-pointer hover:bg-slate-500 border border-black"
            onClick={() => {
              handleVolunteer(obj.username, obj.cohort);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash3 fill-red-500 relative left-44 top-1 cursor-pointer"
              onClick={() => deleteSelectedStudent(obj.username, obj.cohort)}
              viewBox="0 0 16 16"
            >
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
            </svg>
            <h1 className="text-2xl">{obj.username}</h1>
            <p className="text-md">{obj.cohort}</p>
            <p>{obj.participation}</p>
          </div>
        );
      } else {
        return (
          <div
            key={obj._id}
            className="font-robotics bg-gradient-to-bl w-48 h-28 text-white from-slate-900 via-gray-600 to-fuchsia-900 rounded hover:bg-slate-500 border border-black"
          >
            <h1 className="text-2xl">{obj.username}</h1>
            <p className="text-md">{obj.cohort}</p>
            <p>{obj.participation}</p>
          </div>
        );
      }
    });
    setOpenStudentsArray((prev) => !prev);
    setStudentsArray(students);
    setChosenArray(chosenCohort[0].chosen);
  };

  const handleCohortReset = async () => {
    let res = await fetch(`cohort/resetcohort/${chosenCohort.cohort}`, {
      method: 'PATCH',
      redirect: 'follow',
    });
    clearTimeout(timeoutId);
    res = await res.json();
    let students = res.students.map((obj) => {
      if (userAdmin) {
        return (
          <div
            key={obj._id}
            className="font-robotics hover:text-yellow-500 hover:translate-y-1 bg-gradient-to-bl w-48 h-28 text-white from-slate-900 via-gray-600 to-fuchsia-900 rounded cursor-pointer hover:bg-slate-500 border border-black"
            onClick={() => {
              handleVolunteer(obj.username, obj.cohort);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash3 fill-red-500 relative left-44 top-1 cursor-pointer"
              onClick={() => deleteSelectedStudent(obj.username, obj.cohort)}
              viewBox="0 0 16 16"
            >
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
            </svg>
            <h1 className="text-2xl">{obj.username}</h1>
            <p className="text-md">{obj.cohort}</p>
            <p>{obj.participation}</p>
          </div>
        );
      } else {
        return (
          <div
            key={obj._id}
            className="font-robotics bg-gradient-to-bl w-48 h-28 text-white from-slate-900 via-gray-600 to-fuchsia-900 rounded hover:bg-slate-500 border border-black"
          >
            <h1 className="text-2xl">{obj.username}</h1>
            <p className="text-md">{obj.cohort}</p>
            <p>{obj.participation}</p>
          </div>
        );
      }
    });

    setLoading(false);
    setChosenCohort(res);
    setStudentsArray(students);
    setChosenStudent('');
    setChosenArray([]);
  };

  const handleChooseParticpant = async (chosenUser) => {
    // playWheel();
    // getAllCohorts();
    // setLoading(true);
    setTimeoutId(
      setTimeout(async () => {
        // const randomNum = Math.floor(
        //   Math.random() * (studentsArray.length - 1)
        // );

        // const student = chosenCohort.students[randomNum].username;
        let res = await fetch(`/cohort/chosenuser/${chosenCohort.cohort}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'Application/JSON',
          },
          body: JSON.stringify({
            username: chosenUser,
          }),
        });
        res = await res.json();
        console.log(res);
        setChosenCohort(res.cohort);
        let students = res.cohort.students.map((obj) => {
          if (userAdmin) {
            return (
              <div
                key={obj._id}
                className="font-robotics hover:text-yellow-500 hover:translate-y-1 bg-gradient-to-bl w-48 h-28 text-white from-slate-900 via-gray-600 to-fuchsia-900 rounded cursor-pointer hover:bg-slate-500 border border-black"
                onClick={() => {
                  handleVolunteer(obj.username, obj.cohort);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash3 fill-red-500 relative left-44 top-1 cursor-pointer"
                  onClick={() =>
                    deleteSelectedStudent(obj.username, obj.cohort)
                  }
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                </svg>
                <h1 className="text-2xl">{obj.username}</h1>
                <p className="text-md">{obj.cohort}</p>
                <p>{obj.participation}</p>
              </div>
            );
          } else {
            return (
              <div
                key={obj._id}
                className="font-robotics bg-gradient-to-bl w-48 h-28 text-white from-slate-900 via-gray-600 to-fuchsia-900 rounded hover:bg-slate-500 border border-black"
              >
                <h1 className="text-2xl">{obj.username}</h1>
                <p className="text-md">{obj.cohort}</p>
                <p>{obj.participation}</p>
              </div>
            );
          }
        });
        setLoading(false);
        setStudentsArray(students);
        setChosenStudent(res.user);
        setChosenArray([res.user, ...chosenArray]);
      }, 1000)
    );
  };
  const handleVolunteer = async (volunteer, volCohort) => {
    try {
      const student = volunteer;
      const res = await fetch(`/cohort/volunteer/${volCohort}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({
          username: student,
        }),
      });
      const parsedRes = await res.json();
      let students = parsedRes.cohort.students.map((obj) => {
        if (userAdmin) {
          return (
            <div
              key={obj._id}
              className="font-robotics hover:text-yellow-500 hover:translate-y-1 bg-gradient-to-bl w-48 h-28 text-white from-slate-900 via-gray-600 to-fuchsia-900 rounded cursor-pointer hover:bg-slate-500 border border-black"
              onClick={() => {
                handleVolunteer(obj.username, obj.cohort);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3 fill-red-500 relative left-44 top-1 cursor-pointer"
                onClick={() => deleteSelectedStudent(obj.username, obj.cohort)}
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
              <h1 className="text-2xl">{obj.username}</h1>
              <p className="text-md">{obj.cohort}</p>
              <p>{obj.participation}</p>
            </div>
          );
        } else {
          return (
            <div
              key={obj._id}
              className="font-robotics bg-gradient-to-bl w-48 h-28 text-white from-slate-900 via-gray-600 to-fuchsia-900 rounded hover:bg-slate-500 border border-black"
            >
              <h1 className="text-2xl">{obj.username}</h1>
              <p className="text-md">{obj.cohort}</p>
              <p>{obj.participation}</p>
            </div>
          );
        }
      });

      setChosenCohort(parsedRes.cohort);
      setStudentsArray(students);
      setChosenArray(parsedRes.cohort.chosen);
    } catch (err) {
      console.log('Error in handle volunteer, ', err);
    }
  };
  const deleteCohort = (cohort) => {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/JSON' },
      body: JSON.stringify({ cohort: cohort }),
    };
    fetch('/cohort/delete', options)
      .then((response) => response.json())
      .then((response) => getAllCohorts());
  };

  const cohort = allCohorts.map((obj) => (
    <button
      className="cursor-pointer rounded-br-lg via-gray-600 to-fuchsia-900 hover:bg-indigo-500 shadow-lg shadow-indigo-500/50 text-2xl font-extrabold ...text-white font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500... hover:text-black w-fit p-4 border border-black  hover:shadow-[0_4px_0px_rgb(222, 111, 12)] text-indigo bg-white ease-out hover:translate-y-1 transition-all rounded"
      onClick={() => handleClickedCohort(obj._id)}
      key={obj._id}
    >
      {userAdmin && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash3 fill-red-500 relative left-36 top-12 cursor-pointer"
          onClick={() => deleteCohort(obj.cohort)}
          viewBox="0 0 16 16"
        >
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
        </svg>
      )}
      {`Cohort ${obj.cohort}`}
    </button>
  ));

  if (openStudentsArray) {
    return (
      <>
        <div className="mt-8 gap-2 flex justify-center active:">{cohort}</div>
        {studentsArray.length > 0 && loading && (
          <div className="flex justify-center my-8 mx-24">
            <Wheel handleChooseParticpant={handleChooseParticpant} setAnimationClass={setAnimationClass} animationClass={animationClass} setRandomNum={setRandomNum} randomNum={randomNum} studentsArray={chosenCohort.students} setWheelChose={setWheelChose}/>
          </div>
        )}
        <div className="flex justify-center my-8 mx-24">
          {chosenStudent && (
            <div className="border-indigo-800 border-4 rounded-xl">
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
        </div>
        {userAdmin && (
          <div>
            <div className="flex justify-center my-8 mx-24">
              <div>
                <div className="flex items-end justify-end gap-4 text-2xl font-extrabold font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                  <button
                    className=" bg-indigo-900 hover:bg-indigo-800 shadow-lg text-white py-2 px-4 rounded transition duration-300 ease-in-out"
                    onClick={()=>{
                      // handleChooseParticpant();
                      playWheel();
                      getAllCohorts();
                      setLoading(true);
                      setAnimationClass('run-animation')
                      const randomNumber = Math.floor(Math.random()*360)
                      setRandomNum(randomNumber);
                    }
                    }
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
            </div>
          </div>
        )}

        <div className="mx-18 mt-8 gap-2 flex  flex-wrap justify-center">
          {openStudentsArray ? studentsArray : null}
        </div>
        {chosenArray.length > 0 && (
          <div className="mx-18 mt-8 gap-2 flex justify-end ">
            <List
              sx={{
                width: '100%',
                maxWidth: 200,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                textAlign: 'center',
                fontFamily: 'Silkscreen',
                marginRight: '1em',
                '& ul': { padding: 0 },
              }}
            >
              <ListSubheader style={{ fontFamily: 'Silkscreen' }}>
                Past Participants
              </ListSubheader>
              {chosenArray.map((chosen, i) => (
                <ul>
                  <li key={i}>{chosen.username}</li>
                </ul>
              ))}
            </List>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="mt-8 gap-2 flex justify-center">{cohort}</div>
      {userAdmin && (
        <div className="flex justify-center items-center mt-8">
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
      )}
    </>
  );
};

export default Home;
