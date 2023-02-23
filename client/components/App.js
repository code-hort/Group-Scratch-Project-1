import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Loading from './Loading.js';
import Profile from './Profile.js';
import Signup from './Signup.js';
import Login from './Login.jsx';
import Home from './home.jsx';
import Nav from './Nav.js';
import Add from './Add.jsx';

const App = () => {
  //******************** state *************************************** */
  const [allCohorts, setAllCohorts] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currUser, setCurrUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [cohort, setCohort] = useState('');
  const [newAdmin, setNewAdmin] = useState('');
  const [userAdmin, setUserAdmin] = useState(false);

  //******************** handler functions */

  const handleUsername = (e) => {
    console.log(username);
    setUsername(e.target.value);
  };
  const handlePassword = (e) => setPassword(e.target.value);
  const handleCohort = (e) => setCohort(e.target.value);
  const handleAdmin = (e) => setNewAdmin(e.target.value);

  //************************ fetch requests ************************* */
  const navigate = useNavigate();

  useEffect(() => {
    const cookieInfo = document.cookie;
    console.log(cookieInfo);
    const cookieName = cookieInfo.slice(0, 8);
    if (cookieName === 'codehort') {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, []);

  function createUser() {
    fetch('/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        username,
        password,
        cohort,
        isAdmin: newAdmin,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrUser(data.user);
        setLoggedIn(true);
        if (data.user.isAdmin) {
          setUserAdmin(true);
          return navigate('/');
        }
        return navigate('/profile');
      });
  }
  async function login() {
    try {
      let res = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      res = await res.json();
      setCurrUser(res);
      setLoggedIn(true);
      setNewAdmin(res.isAdmin);
      setUserAdmin(res.isAdmin);
      if (res.isAdmin) {
        console.log(newAdmin);
        return navigate('/');
      }
      return navigate('/Profile');
    } catch (error) {
      console.log(error);
    }
  }
  const signout = () => {
    console.log('clicked signout');
    setLoggedIn(false);
    setUserAdmin(false);
    setUsername('');
    setPassword('');
    setCurrUser('');
    setCohort('');
    //setUser("");
    // deleting cookie should happen here on the back end!
    fetch('/user/logout')
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return navigate('/login');
      });
  };

  function getAllCohorts() {
    fetch('/cohort', { method: 'GET' })
      .then((response) => response.json())
      .then((response) => {
        setAllCohorts(response);
        response.sort((a, b) => {
          if (a.cohort < b.cohort) {
            return -1;
          }
          if (a.cohort > b.cohort) {
            return 1;
          }
        });
        setAllCohorts(response);
        console.log('app component all cohorts', allCohorts);
      })
      .catch((error) => console.log('error', error));
  }

  useEffect(() => {
    getAllCohorts();
  }, []);

  if (!allCohorts) return <Loading />;
  console.log('app component all cohorts', allCohorts);

  return (
    <div className="">
      <Nav currUser={currUser} signout={signout} loggedIn={loggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              allCohorts={allCohorts}
              getAllCohorts={getAllCohorts}
              createUser={createUser}
              userAdmin={userAdmin}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              username={username}
              password={password}
              handlePassword={handlePassword}
              handleUsername={handleUsername}
              login={login}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              username={username}
              password={password}
              handleCohort={handleCohort}
              cohort={cohort}
              handlePassword={handlePassword}
              handleUsername={handleUsername}
              createUser={createUser}
              handleAdmin={handleAdmin}
              newAdmin={newAdmin}
            />
          }
        />
        <Route
          path="/Profile"
          element={<Profile currUser={currUser} newAdmin={newAdmin} />}
        />
        <Route path="/add" element={<Add />} />
      </Routes>
    </div>
  );
};

export default App;
