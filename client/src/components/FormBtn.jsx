import React from 'react'

const FormBtn = (props) => {
  return (
    <button type='submit' className='bg-light-purple-1 rounded-full text-white py-4 px-28 font-semibold shadow-md transition hover:bg-dark-purple-2'>{props.text}</button>
  )
}

export default FormBtn
