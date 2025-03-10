import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Logo from './Logo'

const Menu = () => {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const location = useLocation()
  const { logout, user } = useAuthStore()
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  const handleLogout = () => {
    logout();
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSubmenuOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div className='bg-white flex justify-between items-center px-16 py-4 shadow-md'>
      <Logo />
      <div className='flex items-center'>
          <div to={'/profile'} className='flex items-center relative'>
            <div className='text-black font-medium'>{user.name}</div>
            <button onClick={() => setSubmenuOpen(true)} className={`${submenuOpen ? 'text-light-purple-1' : 'text-gray-4'} ml-1 px-1 rounded-full transition hover:text-light-purple-1`}>
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
            {
              submenuOpen &&     
                <motion.button onClick={handleLogout} ref={wrapperRef} className='flex items-center absolute top-8 right-0 bg-white shadow-md px-6 py-2 z-10 rounded border-1 border-gray-8'
                  initial={{ opacity: 0, y: -13}}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut'}}
                  whileHover={{ background: '#D9D9D9' }}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} className='mr-3' />
                  <div>Logout</div>
                </motion.button>
            }
          </div>
      </div>
    </div>
  )
}

export default Menu
