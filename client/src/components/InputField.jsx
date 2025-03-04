import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

const InputField = ({...props}) => {
  const getIcon = () => {
    if (props.name == 'email') {
      return <FontAwesomeIcon icon={faEnvelope} />
    }
    else if (props.name == 'password') {
      return <FontAwesomeIcon icon={faLock} />
    }
  }

  return (
    <div className={`${props.classes} w-full border-1 border-gray-1 px-6 flex items-center rounded-full text-gray-4 shadow`}>
      {getIcon()}
      <input {...props} className={`ml-3 focus:outline-none text-black w-full py-4`} />
    </div>
  )
}

export default InputField
