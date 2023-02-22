import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

const Home = ({ allCohorts, getAllCohorts, createUser }) => {
  const [chosenCohort, setChosenCohort] = useState('');
  const [studentsArray, setStudentsArray] = useState('');
  const [openStudentsArray, setOpenStudentsArray] = useState(false);
  const [newCohort, setNewCohort] = useState('');
  const [chosenStudent, setChosenStudent] = useState('');
  const [newStudent, setNewStudent] = useState('');
  const [newStudentCohort, setNewStudentCohort] = useState('');
  const [deleteStudent, setDeleteStudent] = useState('');
  const [chosenArray, setChosenArray] = useState('');

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

  const handleDeleteStudent = (e) => {
    setDeleteStudent(e.target.value);
    console.log(deleteStudent);
  };
  const deleteSelectedStudent = async () => {
    try {
      const response = await fetch(`/user/delete/${chosenCohort.cohort}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({
          username: deleteStudent,
        }),
      });
      const parsedResponse = await response.json();
      console.log('Student successfully deleted');
      getAllCohorts();
    } catch (err) {
      console.log('Error in deleting selected student');
    }
  };

  const createNewStudent = async () => {
    console.log('about to create new student');
    fetch('/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        username: newStudent,
        password: 'password',
        cohort: newStudentCohort,
      }),
    }).then((res) => {
      res.json();
    });
    console.log('create response', res);
    getAllCohorts();
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
    const chosenCohort = allCohorts.filter((obj) => {
      return obj._id === id;
    });
    setChosenCohort(chosenCohort[0]);
    let students = chosenCohort[0].students.map((obj) => {
      return (
        <div
          key={obj._id}
          className="font-robotics bg-gradient-to-bl w-48 h-24 text-white from-slate-900 via-gray-600 to-fuchsia-900 rounded   hover:bg-slate-500 border border-black"
        >
          <h1 className="text-2xl">{obj.username}</h1>
          <div className="text-md">{obj.cohort}</div>
          <div>{obj.participation}</div>
        </div>
      );
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
    res = await res.json();
    let students = res.students.map((obj) => {
      return (
        <div
          key={obj._id}
          className="font-robotics bg-gradient-to-bl w-48 h-24 text-white from-slate-900 via-gray-600 to-fuchsia-900 rounded   hover:bg-slate-500 border border-black"
        >
          <h1 className="text-2xl">{obj.username}</h1>
          <div className="text-md">{obj.cohort}</div>
          <div>{obj.participation}</div>
        </div>
      );
    });
    setChosenCohort(res);
    setStudentsArray(students);
    setChosenStudent('');
    setChosenArray([]);
  };

  const handleChooseParticpant = async () => {
    const randomNum = Math.floor(Math.random() * (studentsArray.length - 1));
    console.log(chosenCohort);
    const student = chosenCohort.students[randomNum].username;
    let res = await fetch(`/cohort/chosenuser/${chosenCohort.cohort}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        username: student,
      }),
    });
    res = await res.json();
    setChosenCohort(res.cohort);
    let students = res.cohort.students.map((obj) => {
      return (
        <div
          key={obj._id}
          className="font-robotics bg-gradient-to-bl w-48 h-24 text-white from-slate-900 via-gray-600 to-fuchsia-900 rounded   hover:bg-slate-500 border border-black"
        >
          <h1 className="text-2xl">{obj.username}</h1>
          <div className="text-md">{obj.cohort}</div>
          <div>{obj.participation}</div>
        </div>
      );
    });
    setStudentsArray(students);
    setChosenStudent(res.user);
    setChosenArray([res.user, ...chosenArray]);
  };

  const cohort = allCohorts.map((obj) => (
    <button
      className="cursor-pointer rounded-br-lg via-gray-600 to-fuchsia-900 hover:bg-indigo-500 shadow-lg shadow-indigo-500/50 text-2xl font-extrabold ...text-white font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500... hover:text-black w-fit p-4 border border-black  hover:shadow-[0_4px_0px_rgb(222, 111, 12)] text-indigo bg-white ease-out hover:translate-y-1 transition-all rounded"
      onClick={() => handleClickedCohort(obj._id)}
      key={obj._id}
    >
      {`Cohort ${obj.cohort}`}
    </button>
  ));

  if (openStudentsArray) {
    return (
      <>
        <div className="mt-8 gap-2 flex justify-center active:">{cohort}</div>
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

        {/* need to fix the styling on this delete button */}
        <div>
          <input
            placeholder="first and last name"
            className="font-robotics border border-black px-2 py-1 rounded-lg mr-2"
            value={deleteStudent}
            onChange={(e) => handleDeleteStudent(e)}
          />
          <button onClick={() => deleteSelectedStudent()}>Delete Button</button>
        </div>

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
        <div>
          <div className="flex justify-center my-8 mx-24">
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
          </div>
        </div>

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
                '& ul': { padding: 0 },
              }}
            >
              <ListSubheader
                style={{ fontFamily: 'Silkscreen' }}
              >{`Chosen Students`}</ListSubheader>
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
    </>
  );
};

export default Home;
