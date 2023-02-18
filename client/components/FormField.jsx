import React from 'react'

const FormField = () => {
  return (
    <form>
      <label>
        Username:
        <input type="text"/>
      </label>
      <br />
      <label>
        Password:
        <input type="password"/>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  )
}

export default FormField