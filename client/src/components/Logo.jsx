import React from 'react'
import { Link } from 'react-router-dom'

import stickyNote from '../assets/img/sticky-note.png'

const Logo = () => {
  return (
    <Link to={'/home'} className='flex items-center w-fit'>
      <img src={stickyNote} alt="sticky-note.png" className='w-10 mr-3' />
      <div className='logo-font text-2xl'>ListIt</div>
    </Link>
  )
}

export default Logo
