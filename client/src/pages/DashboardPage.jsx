import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import SideMenu from '../components/SideMenu';
import InputField from '../components/InputField';

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
  let dayBefore = new Date()
  dayBefore = dayBefore.setDate(dayBefore.getDate() - 1)
  dayBefore = new Date(dayBefore)
  let dayAfter = new Date()
  dayAfter = dayAfter.setDate(dayAfter.getDate() + 1)
  dayAfter = new Date(dayAfter)
  const options = {
    month: 'short',
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
    <div className={`bg-light-purple-2 h-screen flex`}>
      {taskFormOpen || categoryFormOpen ? <div className='fixed h-screen w-screen bg-white opacity-60'></div> : <></>}
      <SideMenu />
      <div className='py-10 px-14 w-full'>
        <div className='flex items-center justify-between'>
          {/* <div className='flex'> */}
            <div className='flex items-center'>
              <div className='text-xl text-gray-4'>{dayBefore.toLocaleDateString(undefined, options)}</div>
              <div className='text-3xl mx-8 font-medium flex flex-col'>{currentDate.toLocaleDateString(undefined, options)}
                <div className='flex justify-center'>
                  <div className='border-b-3 border-light-purple-1 pb-2 w-1/3'></div>
                </div>
              </div>
              <div className='text-xl text-gray-4'>{dayAfter.toLocaleDateString(undefined, options)}</div>
            </div>
            <div className='flex items-center'>
              <button onClick={() => setTaskFormOpen(true)} className='font-medium border-2 border-gray-4 text-light-purple-1 py-3 px-5 rounded-md flex items-center transition hover:bg-light-purple-5'><FontAwesomeIcon className='mr-3' icon={faPlus} size='sm' />
              Task</button>
              <button onClick={() => setCategoryFormOpen(true)} className='font-medium border-2 border-gray-4 text-light-purple-1 py-3 px-5 rounded-md flex items-center transition hover:bg-light-purple-5 ml-3'><FontAwesomeIcon className='mr-4' icon={faPlus} size='sm' />
              Category</button>
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

              {
                categoryFormOpen ? 
                  <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-10'>
                    <div className='bg-white rounded-b-md rounded-t-sm overflow-clip w-1/3 shadow-xl shadow-light-purple-2'>
                      <div className='border-t-4 border-light-purple-1 bg-light-purple-2 py-4 px-4 text-light-purple-1 flex items-center justify-between'>
                        <div>Add new category</div>
                        <FontAwesomeIcon className='text-gray-4' icon={faXmark} size='lg' />
                      </div>
                      <form onSubmit={handleCategorySubmit} className='py-4 px-4 flex flex-col'>
                        <label className='mb-2'>Category Name</label>
                        <input onChange={(e) => setCategoryName(e.target.value)} value={categoryName} type="text" className='border-1 border-gray-3 rounded-md py-2 px-3 mb-4' />
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
                    </div>
                  </div>
                :
                  <></>
              }
            </div>
          {/* </div> */}

        </div>

      </div>
      
      {/* <button className='bg-red-400' onClick={handleLogout}>Logout</button> */}
    </div>
  )
}

export default DashboardPage
