import React from 'react'

import stickyNote from '../assets/img/sticky-note.png'

const Logo = () => {
  return (
    <div className='flex items-center'>
      <img src={stickyNote} alt="sticky-note.png" className='w-10 mr-2' />
      <div className='logo-font'>ListIt</div>
    </div>
  )
}

export default Logo
