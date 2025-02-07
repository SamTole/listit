import React from 'react'

const FormBtn = (props) => {
  return (
    <button className='bg-light-purple-1 rounded-full text-white py-4 px-5 font-bold drop-shadow-md transition hover:bg-dark-purple-2'>{props.text}</button>
  )
}

export default FormBtn
