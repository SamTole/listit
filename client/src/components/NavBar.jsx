import React from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Logo from './Logo'

const NavBar = () => {
  return (
    <div className='flex justify-between items-center py-8 lg:px-20 px-10 z-10'>
        <Logo />
        <div className='hidden lg:block flex justify-center items-center font-medium'>
            <Link className='border-b-3 border-transparent transition hover:border-light-purple-1 pb-1' to={''}>About</Link>
            <Link className='border-b-3 border-transparent transition hover:border-light-purple-1 pb-1 ml-40' to={''}>Contact</Link>
            <Link className='border-b-3 border-transparent transition hover:border-light-purple-1 pb-1 ml-40' to={'/login'}>Login</Link>
        </div>
        <FontAwesomeIcon className='lg:hidden' icon={faBars} size='xl' />
    </div>
  )
}

export default NavBar
