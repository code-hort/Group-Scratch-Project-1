import React, { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Loading from "./Loading.js"
import Profile from "./Profile.js"
import Signup from "./Signup.js"
import Login from "./Login.jsx"
import Home from "./home.jsx"
import Nav from "./Nav.js"
import PopupModal from "./PopupModal.js"
import Switcher from "./switcher.js"

console.log("hi git");

const App = () => {
  //******************** state *************************************** */
  const [allCohorts, setAllCohorts] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currUser, setCurrUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [cohort, setCohort] = useState("");

  const [modalState, setModalState] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({});

  //******************** handler functions */

  const handleUsername = (e) => {
    console.log(username);
    setUsername(e.target.value);
  };
  const handlePassword = (e) => setPassword(e.target.value);
  const handleCohort = (e) => setCohort(e.target.value);

  const getOneStudent = async (name) => {
    try {
      const response = await fetch(`/user/${name}`);
      const data = await response.json();
    } catch (err) {
      alert(`ERROR: ${err}`);
    }

    setModalState(true);

  }

  //************************ fetch requests ************************* */
  const navigate = useNavigate();
  function createUser() {
    fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        cohort: cohort,
      }),
    }).then((res) => res.json());

    // .then(setLoggedIn(true))
    // .then(res => setCurrUser(res.user))
    return navigate("/login");
  }
  async function login() {
    try {
      let res = await fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      res = await res.json();
      setCurrUser(res);
      setLoggedIn(true);

      return navigate("/Profile");
    } catch (error) {
      console.log(error);
    }
  }
  const signout = () => {
    setLoggedIn(false);
    setUser("");
  };

  function getAllCohorts() {
    fetch("/cohort", { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        setAllCohorts(response);
        console.log("app component all cohorts", allCohorts);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    getAllCohorts();
  }, []);

  if (!allCohorts) return <Loading />;
  console.log("app component all cohorts", allCohorts);

  return (
    <div className="dark:bg-gray-800">
      {modalState ? <PopupModal setModalState={setModalState} /> : null}
      <Nav currUser={currUser} signout={signout} loggedIn={loggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              allCohorts={allCohorts}
              getAllCohorts={getAllCohorts}
              createUser={createUser}
              getOneStudent={getOneStudent}
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
            />
          }
        />
        <Route path="/Profile" element={<Profile currUser={currUser} />} />
      </Routes>
    </div>
  );
};

export default App;
