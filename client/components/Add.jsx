import React, { useEffect, useState } from 'react';

const Add = () => {
  const [newStudent, setNewStudent] = useState('');
  const [newStudentCohort, setNewStudentCohort] = useState('');

  const handleNewStudent = (e) => {
    setNewStudent(e.target.value);
  };

  const handleNewStudentCohort = (e) => {
    setNewStudentCohort(e.target.value);
  };

  const createNewStudent = async (e) => {
    e.preventDefault();
    try {
      console.log('about to create new student');
      const res = await fetch('/cohort/addStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({
          username: newStudent,
          cohort: newStudentCohort,
        }),
      });
      console.log("")
      if (res.ok) {
        alert(
          `Successfully added ${newStudent} to Cohort ${newStudentCohort}!`
        );
        setNewStudent('');
        setNewStudentCohort('');
      } else {
        throw new Error('Failed to create new student');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center mr-8 mt-20">
        <form className="m-8" autoComplete="off" onSubmit={createNewStudent}>
          <input
            required
            placeholder="first and last name"
            className="mx-4 h-12 font-robotics border border-black px-2 py-1 rounded-lg mr-2 outline-none focus:outline-fuchsia-500 focus:border-fuchsia-100"
            value={newStudent}
            onChange={(e) => handleNewStudent(e)}
          />
          <input
            required
            placeholder="cohort"
            type="number"
            className="mx-4 h-12 font-robotics border border-black px-2 py-1 rounded-lg mr-2 outline-none focus:outline-fuchsia-500 focus:border-fuchsia-100 "
            value={newStudentCohort}
            onChange={(e) => handleNewStudentCohort(e)}
          />
          <div className="flex flex-col items-center m-10">
            <button
              className="w-3/4 h-16 font-robotics bg-fuchsia-900 hover:bg-indigo-800 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out "
              type="submit"
            >
              Add student
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add;
