import React, { useState, useEffect }  from 'react'
import Cohort from '../components/Cohort.jsx'



const RenderCohorts = ({data}) => {
    if(data?.length > 0) {
        return data.map((cohort) => <Cohort key={cohort._id}{...cohort} />)
    }
}

const Userlogin = () => {

    const renderGenerator = (e) => { 'render the random generator on to the rightside' }

    const handleCohort = (e) => { 'add new cohort to database?' }

    const handleStudent = (e) => { 'add new student to database'}

    useEffect(() => {
        // const fetchCohorts = async () => {
        //     try {
        //         const response = await fetch('/cohort', {
        //             method: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             }
        //         })
        //         response = await response.json()
        //         console.log(response)
        //         }
        //     catch (err) {
        //         alert(err)
        //     }
        // }
  

        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch("/cohort", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));



        // fetchCohorts()
    }, [])


  return (
    <div className="flex flex-wrap box-border h-100 w-50 p-4 border-4 rounded" >userlogin</div>


  )
}

export default Userlogin