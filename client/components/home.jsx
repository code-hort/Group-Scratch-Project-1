import React from 'react'
import FormField from './FormField.jsx'

const Home = ({ allCohorts }) => {


const cohort = allCohorts.map(obj => <div id={cohort._id}>{`Cohort ${obj.cohort}`}</div>)

return (
{cohort}
)
}

export default Home