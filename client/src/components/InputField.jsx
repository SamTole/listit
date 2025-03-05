import React, { useRef, useEffect } from "react"

const InputField = ({...props}) => {

  return (
    <input {...props} className={`ml-3 bg-gray-8 focus:outline-none text-black w-full py-4`} />
  )
}

export default InputField
