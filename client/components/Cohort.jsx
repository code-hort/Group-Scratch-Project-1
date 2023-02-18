import React from 'react'

const Cohort = (_id, name, randomGenerator) => {
  return (
    <button onClick={renderGenerator}>{name}</button>
  )
}

export default Cohort