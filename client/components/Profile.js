import React, { useEffect, useState } from 'react';

const Profile = ({ currUser, newAdmin, allCohorts }) => {
  //required state
  const [currCohortData, setCurrCohortData] = useState(null);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [participation, setParticipation] = useState(null);

  //function to sort combined arrays by descending order of participation points
  function sortUsersByParticipation(users) {
    //sorting takes two object, a and b
    return users.sort((a, b) => {
      //if object has participation property assign to that value or assign zero if none
      const aParticipation = a.participation || 0;
      const bParticipation = b.participation || 0;
      //subtracts a from b. if a has a higher amount will return a negative value and a will come before b, if positive the opposite will happen
      return bParticipation - aParticipation;
    });
  }

  //useEffect hook that runs whenever allCohorts or currUser.cohort changes
  useEffect(() => {
    //if truthy
    if (allCohorts) {
      //finds cohort in allCohorts which is equal to the current users cohort
      const foundCohort = allCohorts.find(
        (cohort) => cohort.cohort === currUser.cohort
      );
      //sets the state of the current cohort data to found cohort
      setCurrCohortData(foundCohort);
    }
    //dependencies on which it checks for value changes to run when necessary
  }, [allCohorts, currUser.cohort]);

  //use effect hook that runs whenever currCohortData changes
  useEffect(() => {
    //if truthy
    if (currCohortData) {
      //deconstruct students and chosen arrays from current cohort data
      const { students, chosen } = currCohortData;
      //combine arrays into one array
      const combinedUsers = [...students, ...chosen];
      //use the sortUsers function to save users into descending participation order
      const sortedUsers = sortUsersByParticipation(combinedUsers);
      //set state of result
      setSortedUsers(sortedUsers);
    }
    //dependencies to check for value changes to run
  }, [currCohortData]);

  useEffect(() => {
    setParticipation(currUser.participation);
  }, [currUser.participation]);

  return (
    <div className="flex flex-col items-center">
      <div
        className='cursor-pointer rounded-br-lg via-gray-600 to-fuchsia-900 hover:bg-indigo-500 shadow-lg shadow-indigo-500/50 text-2xl font-extrabold ...text-white font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500... hover:text-black w-fit p-4 border border-black m-2  hover:shadow-[0_4px_0px_rgb()] text-indigo bg-white ease-out hover:translate-y-1 transition-all rounded">
hover effect 1'
      >
        Your name: {currUser.username}
      </div>
      <div
        className='cursor-pointer rounded-br-lg via-gray-600 to-fuchsia-900 hover:bg-indigo-500 shadow-lg shadow-indigo-500/50 text-2xl font-extrabold ...text-white font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500... hover:text-black w-fit p-4 border border-black m-2  hover:shadow-[0_4px_0px_rgb()] text-indigo bg-white ease-out hover:translate-y-1 transition-all rounded">
hover effect 1'
      >
        {' '}
        Your Cohort: {currUser.cohort}
      </div>
      <div
        className='cursor-pointer rounded-br-lg via-gray-600 to-fuchsia-900 hover:bg-indigo-500 shadow-lg shadow-indigo-500/50 text-2xl font-extrabold ...text-white font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500... hover:text-black w-fit p-4 border border-black m-2  hover:shadow-[0_4px_0px_rgb()] text-indigo bg-white ease-out hover:translate-y-1 transition-all rounded">
hover effect 1'
      >
        {' '}
        Participation Times: {participation}
      </div>

      {newAdmin && (
        <div
          className='cursor-pointer rounded-br-lg via-gray-600 to-fuchsia-900 hover:bg-indigo-500 shadow-lg shadow-indigo-500/50 text-2xl font-extrabold ...text-white font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500... hover:text-black w-fit p-4 border border-black m-2  hover:shadow-[0_4px_0px_rgb()] text-indigo bg-white ease-out hover:translate-y-1 transition-all rounded">
hover effect 1'
        >
          Status: Admin
        </div>
      )}
      <div className="mt-10 flex flex-col items-center">
        <h2
          className=' rounded-br-lg via-gray-600 to-fuchsia-900 text-2xl font-extrabold ...text-white font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500...">
hover effect 1'
        >
          Top Cohort Participators:
        </h2>
        <div className="flex justify-center flex-wrap">
          {sortedUsers.slice(0, 3).map((user) => (
            <div
              key={user.id}
              className="rounded-br-lg via-gray-600 to-fuchsia-900  shadow-lg shadow-indigo-500/50 text-1xl font-extrabold ...text-white font-robotics bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500...  w-fit p-4 border border-fuchsia-900 m-2   text-indigo bg-white ease-out  transition-all rounded"
            >
              <p>Name: {user.username}</p>
              <p>Participation: {user.participation || 0}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
