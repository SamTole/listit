import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'

import SideMenu from '../components/SideMenu';

const DashboardPage = () => {
  const [formOpen, setFormOpen] = useState(false)

  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  }

  const addTask = () => {
    setFormOpen(true)

    console.log('open')
  }

  return (
    <div className='bg-light-purple-2 h-screen flex'>
      <SideMenu />

      <div>
        <button onClick={(e) => addTask()} className='bg-light-purple-1'>Add Task</button>
      </div>
      {/* <button className='bg-red-400' onClick={handleLogout}>Logout</button> */}
    </div>
  )
}

export default DashboardPage
