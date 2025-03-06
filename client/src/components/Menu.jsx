import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useAuthStore } from '../store/authStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleList, faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faUserCircle, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Logo from './Logo'
import stickyNote from '../assets/img/sticky-note.png'

const SideMenu = () => {
  const location = useLocation()
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout();
  }

  return (
    <div className='bg-white flex justify-between items-center px-16 py-4 shadow-md'>
      <Logo />
      <div className='flex items-center'>
          {/* <Link to={'/'}><FontAwesomeIcon icon={faRectangleList} size='xl' className={`${location.pathname == '/' ? 'text-light-purple-1' : 'text-gray-4'} transition hover:text-light-purple-1 mr-12`} /></Link> */}
          {/* <Link to={'/calendar'}><FontAwesomeIcon icon={faCalendar} size='xl' className={`${location.pathname == '/calendar' ? 'text-light-purple-1' : 'text-gray-4'} transition hover:text-light-purple-1 mr-12`} /></Link> */}
          <Link onClick={handleLogout}><FontAwesomeIcon icon={faArrowRightFromBracket} size='xl' className='text-gray-4 transition hover:text-light-purple-1' /></Link>
          {/* <Link to={'/profile'} className='flex items-center text-gray-4 transition hover:text-light-purple-1'>
            <FontAwesomeIcon icon={faUserCircle} size='2xl' />
            <FontAwesomeIcon icon={faAngleDown} className='ml-2' />
          </Link> */}
      </div>
    </div>
  )
}

export default SideMenu
