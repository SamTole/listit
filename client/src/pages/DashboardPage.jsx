import React from 'react'
import { useAuthStore } from '../store/authStore'

const DashboardPage = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  }

  return (
    <div className='flex flex-col'>
      <p>Dashboard Page</p>
      <p>Hi {user.name}</p>

      <button className='bg-red-400' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default DashboardPage
