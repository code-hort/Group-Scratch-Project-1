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
      const res = await fetch('/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({
          username: newStudent,
          password: 'password',
          cohort: newStudentCohort,
        }),
      });
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
      <div className="text-center mr-8 mt-8">
        <form autoComplete="off" onSubmit={createNewStudent}>
          <input
            required
            placeholder="first and last name"
            className="font-robotics border border-black px-2 py-1 rounded-lg mr-2"
            value={newStudent}
            onChange={(e) => handleNewStudent(e)}
          />
          <input
            required
            placeholder="cohort"
            type="number"
            className="font-robotics border border-black px-2 py-1 rounded-lg mr-2"
            value={newStudentCohort}
            onChange={(e) => handleNewStudentCohort(e)}
          />
          <button
            className="font-robotics bg-indigo-900 hover:bg-indigo-800 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
            type="submit"
          >
            Add student
          </button>
        </form>
      </div>
    </>
  );
};

export default Add;
