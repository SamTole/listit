import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'

import SideMenu from '../components/SideMenu';

const DashboardPage = () => {
  const [taskFormOpen, setTaskFormOpen] = useState(false)
  const [categoryFormOpen, setCategoryFormOpen] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [categoryColor, setCategoryColor] = useState('')

  const { user, logout, addCategory, categories } = useAuthStore();

  const handleLogout = () => {
    logout();
  }

  const addTask = () => {
    setTaskFormOpen(true)

    console.log('open')
  }
  
  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    await addCategory(categoryName, categoryColor)
  }

  return (
    <div className='bg-light-purple-2 h-screen flex'>
      <SideMenu />
      <div>
        <button onClick={(e) => addTask()} className='bg-light-purple-1'>Add Task</button>
        {
          taskFormOpen ? 
            <form className='bg-white p-2 flex flex-col'>
              <input type="text" placeholder='Title' className='border' />
              <textarea placeholder='Description' className='border'></textarea>
              <button type="submit">Submit</button>
            </form>
          :
            <></>
        }

        <button onClick={(e) => setCategoryFormOpen(true)} className='bg-light-purple-1'>Add Category</button>
        {
          categoryFormOpen ? 
            <form onSubmit={handleCategorySubmit} className='bg-white p-2 flex flex-col'>
              <input onChange={(e) => setCategoryName(e.target.value)} value={categoryName} type="text" placeholder='Category name' className='border' />
              <select onChange={(e) => setCategoryColor(e.target.value)} defaultValue={'default'} className='border'>
                <option value="default" disabled>Select color</option>
                <option value="red">Red</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
              </select>
              <button type='submit'>Submit</button>
            </form>
          :
            <></>
        }
      </div>
      <button className='bg-red-400' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default DashboardPage
