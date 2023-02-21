import React from "react";


export default function Profile({currUser}) {
  console.log(currUser.username)
return(
  <div>
    <div>{currUser.username}</div>
    <div> {currUser.cohort}</div>
  </div>
  
)

}