import React from "react";
import { Link } from "react-router-dom";

export default function Profile({currUser}) {
  console.log(currUser.username)
return(
  <div>
    <div>{currUser.username}</div>
    <div> {currUser.cohort}</div>
  </div>
  
)

}