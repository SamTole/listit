import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import SideMenu from '../components/SideMenu';

const DashboardPage = () => {
  const [taskFormOpen, setTaskFormOpen] = useState(false)
  const [categoryFormOpen, setCategoryFormOpen] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [categoryColor, setCategoryColor] = useState('')
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskCategory, setTaskCategory] = useState('')
  const [taskDeadline, setTaskDeadline] = useState('')

  const { user, logout, addCategory, addTask } = useAuthStore();
  const currentDate = new Date()
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  // const handleLogout = () => {
  //   logout();
  // }
  
  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    await addCategory(categoryName, categoryColor)
  }

  const handleTaskSubmit = async (e) => {
    e.preventDefault()
    await addTask(taskName, taskDescription, taskCategory, taskDeadline)
  }

  return (
    <div className='bg-light-purple-2 h-screen flex'>
      <SideMenu />
      <div className='py-8 px-12 w-full'>
        <div className='flex items-center justify-between border-b-2 border-light-purple-4 pb-8'>
          <div className='flex items-center'>
            <FontAwesomeIcon className='text-gray-5' icon={faAngleLeft} size='lg' />
            <div className='mx-8 text-xl'>{currentDate.toLocaleDateString(undefined, options)}</div>
            <FontAwesomeIcon className='text-gray-5' icon={faAngleRight} size='lg' />
          </div>
          <div>
            <button onClick={() => setTaskFormOpen(true)} className='bg-light-purple-5 text-dark-purple-1 py-2 px-6 rounded-full'>Add Task</button>
            {
              taskFormOpen ? 
                <form onSubmit={handleTaskSubmit} className='bg-white p-2 flex flex-col'>
                  <input onChange={(e) => setTaskName(e.target.value)} value={taskName} type="text" placeholder='Title' className='border' />
                  <textarea onChange={(e) => setTaskDescription(e.target.value)} value={taskDescription} placeholder='Description' className='border'></textarea>
                  <select onChange={(e) => setTaskCategory(e.target.value)} value={taskCategory} className='border'>
                    {
                      user.categories.map((category, index) => 
                        <option key={index}>{category.name}</option>
                      )
                    }
                  </select>
                  <input onChange={(e) => setTaskDeadline(e.target.value)} value={taskDeadline} type="date" className='border' />
                  <button type="submit">Submit</button>
                </form>
              :
                <></>
            }

            <button onClick={() => setCategoryFormOpen(true)} className='bg-light-purple-1'>Add Category</button>
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
        </div>

      </div>
      
      {/* <button className='bg-red-400' onClick={handleLogout}>Logout</button> */}
    </div>
  )
}

export default DashboardPage
