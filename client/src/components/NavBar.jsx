import React from 'react'
import { Link } from 'react-router-dom'

import Logo from './Logo'

const NavBar = () => {
  return (
    <div className='grid grid-cols-3 items-center py-8 px-12 z-10'>
        <Logo />
        <div></div>
        <div className='grid grid-cols-3 justify-items-end font-medium'>
            <Link to={'/home'}>Home</Link>
            <Link to={''}>About</Link>
            <Link to={'/login'}>Login</Link>
        </div>
    </div>
  )
}

export default NavBar
