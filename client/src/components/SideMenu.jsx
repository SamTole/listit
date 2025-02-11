import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useAuthStore } from '../store/authStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleList, faCalendar, faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import stickyNote from '../assets/img/sticky-note.png'

const SideMenu = () => {
  const location = useLocation()
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout();
  }

  return (
    <div className='bg-white flex flex-col justify-between items-center p-8 shadow-lg'>
        <img src={stickyNote} alt="sticky-note.png" className='w-10' />
        <div className='flex flex-col items-center'>
            <Link to={'/'}><FontAwesomeIcon icon={faRectangleList} size='xl' className={`${location.pathname == '/' ? 'text-light-purple-1' : 'text-gray-4'} transition hover:text-light-purple-1`} /></Link>
            <Link to={'/calendar'} className='my-20'><FontAwesomeIcon icon={faCalendar} size='xl' className={`${location.pathname == '/calendar' ? 'text-light-purple-1' : 'text-gray-4'} transition hover:text-light-purple-1`} /></Link>
            <Link to={'/profile'}><FontAwesomeIcon icon={faUserCircle} size='xl' className={`${location.pathname == '/profile' ? 'text-light-purple-1' : 'text-gray-4'} transition hover:text-light-purple-1`} /></Link>
        </div>
        <Link onClick={handleLogout}><FontAwesomeIcon icon={faArrowRightFromBracket} size='xl' className='text-gray-4 transition hover:text-light-purple-1' /></Link>
    </div>
  )
}

export default SideMenu
