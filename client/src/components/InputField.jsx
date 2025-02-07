import React from 'react'

const InputField = (props) => {
  return (
    <input type={props.type} placeholder={props.placeholder} className={`${props.classes} border border-gray-2 rounded-full py-3 px-5 w-full focus:border-light-purple-1 focus:outline-none focus:ring-1 ring-light-purple-1`} />
  )
}

export default InputField
