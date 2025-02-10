import React from 'react'
import { Link } from 'react-router-dom'

import stickyNote from '../assets/img/sticky-note.png'
import taskMenuIcon from '../assets/img/task-menu-icon.svg'

const SideMenu = () => {
  return (
    <div className='bg-white flex flex-col justify-between items-center px-8 py-10 shadow-lg'>
        <img src={stickyNote} alt="sticky-note.png" className='w-10' />
        <div className='flex flex-col'>
            <Link>lik</Link>
            <img src={taskMenuIcon} alt="" className='text-white' />
        </div>
        <div></div>
    </div>
  )
}

export default SideMenu
