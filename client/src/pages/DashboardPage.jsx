import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import SideMenu from '../components/SideMenu';
import FormBtn from '../components/FormBtn';

const DashboardPage = () => {
  const [taskFormOpen, setTaskFormOpen] = useState(false)
  const [categoryFormOpen, setCategoryFormOpen] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [categoryColor, setCategoryColor] = useState('')
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskCategory, setTaskCategory] = useState('')
  const [taskDeadline, setTaskDeadline] = useState('')
  const [tasks, setTasks] = useState([])
  const { user, logout, addCategory, addTask } = useAuthStore();

  const colorVariants = {
    red: {bg: 'bg-red-category', border: 'border-red-category'},
    orange: {bg: 'bg-orange-category', border: 'border-orange-category'},
    yellow: {bg: 'bg-yellow-category', border: 'border-yellow-category'},
    green: {bg: 'bg-green-category', border: 'border-green-category'},
    blue: {bg: 'bg-blue-category', border: 'border-blue-category'},
    purple: {bg: 'bg-purple-category', border: 'border-purple-category'},
    pink: {bg: 'bg-pink-category', border: 'border-pink-category'},
  }

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
  
  useEffect(() => {
    let filteredTasks = []

    const uniqueCategories = [...new Set(user.tasks.map(task => task.category))]

    uniqueCategories.forEach((category) => {
      let arr = user.tasks.filter((task) => task.category == category)
      filteredTasks.push(arr)
    })
    
    console.log(filteredTasks)
    setTasks(filteredTasks)
  }, [])

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
      <div className='pt-10 pb-5 px-14 w-full flex flex-col'>
        <div className='flex items-center justify-between mb-8'>
          {/* <div className='flex'> */}
            <div className='flex items-center'>
              <div className='text-xl text-gray-4'>{dayBefore.toLocaleDateString(undefined, options)}</div>
              <div className='text-3xl mx-8 font-medium flex flex-col text-gray-5'>{currentDate.toLocaleDateString(undefined, options)}
                <div className='flex justify-center'>
                  <div className='border-b-3 border-light-purple-1 pb-2 w-1/3'></div>
                </div>
              </div>
              <div className='text-xl text-gray-4'>{dayAfter.toLocaleDateString(undefined, options)}</div>
            </div>
            <div className='flex items-center'>
              <button onClick={() => setTaskFormOpen(true)} className='font-medium bg-light-purple-1 text-white py-3 px-5 rounded-md shadow-md flex items-center transition hover:bg-dark-purple-2'><FontAwesomeIcon className='mr-3' icon={faPlus} size='sm' />
              Task</button>
              <button onClick={() => setCategoryFormOpen(true)} className='font-medium bg-light-purple-1 text-white py-3 px-5 rounded-md shadow-md flex items-center transition hover:bg-dark-purple-2 ml-3'><FontAwesomeIcon className='mr-4' icon={faPlus} size='sm' />
              Category</button>
              {
                taskFormOpen ? 
                  <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-10'>
                    <div className='bg-white rounded-b-md rounded-t-sm overflow-clip w-1/3 shadow-xl shadow-light-purple-2'>
                      <div className='border-t-4 border-light-purple-1 bg-light-purple-2 py-4 px-4 text-light-purple-1 flex items-center justify-between'>
                        <div>Add new task</div>
                        <button onClick={() => setTaskFormOpen(false)}><FontAwesomeIcon className='text-gray-4 transition hover:text-light-purple-1' icon={faXmark} size='lg' /></button>
                      </div>
                      <form onSubmit={handleTaskSubmit} className='py-6 px-5 flex flex-col text-gray-5'>
                        <label className='mb-2'>Title</label>
                        <input onChange={(e) => setTaskName(e.target.value)} value={taskName} type="text" className='border-1 border-gray-3 rounded-md py-2 px-3 mb-4' />
                        <label className='mb-2'>Description</label>
                        {/* Ensure this could be scrolled on screens with less height */}
                        <textarea onChange={(e) => setTaskDescription(e.target.value)} value={taskDescription} className='border-1 border-gray-3 rounded-md py-2 px-3 mb-4'></textarea>
                        <div className='flex items-center mb-8'>
                          <div className='flex flex-col w-1/2 mr-2'>
                            <label className='mb-2'>Category</label>
                            <select onChange={(e) => setTaskCategory(e.target.value)} defaultValue={'default'} className='border-1 border-gray-3 rounded-md p-3'>
                            `<option value="default" disabled></option>
                              {
                                user.categories.map((category, index) => 
                                  <option key={index}>{category.name}</option>
                                )
                              }
                            </select>
                          </div>
                          <div className='flex flex-col w-1/2 ml-2'>
                            <label className='mb-2'>Deadline</label>
                            <input onChange={(e) => setTaskDeadline(e.target.value)} value={taskDeadline} type="date" className='border-1 border-gray-3 rounded-md py-2 px-3' />
                          </div>
                        </div>
                        <div className='flex justify-end font-medium'>
                          <button className='bg-light-purple-1 text-white rounded-full px-5 py-2 w-1/3 shadow-md transition hover:bg-dark-purple-2' type='submit'>Save</button>
                        </div>
                      </form>
                    </div>
                  </div>
                :
                  <></>
              }
              {
                categoryFormOpen ? 
                  <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-10'>
                    <div className='bg-white rounded-b-md rounded-t-sm overflow-clip w-1/3 shadow-xl shadow-light-purple-2'>
                      <div className='border-t-4 border-light-purple-1 bg-light-purple-2 py-4 px-4 text-light-purple-1 flex items-center justify-between'>
                        <div>Add new category</div>
                        <button onClick={() => setCategoryFormOpen(false)}><FontAwesomeIcon className='text-gray-4 transition hover:text-light-purple-1' icon={faXmark} size='lg' /></button>
                      </div>
                      <form onSubmit={handleCategorySubmit} className='py-6 px-5 flex flex-col text-gray-5'>
                        <label className='mb-2'>Name</label>
                        <input onChange={(e) => setCategoryName(e.target.value)} value={categoryName} type="text" className='border-1 border-gray-3 rounded-md py-2 px-3 mb-4' />
                        <label className='mb-2'>Color</label>
                        <select onChange={(e) => setCategoryColor(e.target.value)} defaultValue={'default'} className={`text-${categoryColor}-category border-1 border-gray-3 rounded-md py-2 px-3 mb-8 font-semibold`}>
                          <option value="default" disabled></option>
                          <option value="red" className='font-semibold text-red-category'>Red</option>
                          <option value="orange" className='font-semibold text-orange-category'>Orange</option>
                          <option value="yellow" className='font-semibold text-yellow-category'>Yellow</option>
                          <option value="green" className='font-semibold text-green-category'>Green</option>
                          <option value="blue" className='font-semibold text-blue-category'>Blue</option>
                          <option value="purple" className='font-semibold text-purple-category'>Purple</option>
                          <option value="pink" className='font-semibold text-pink-category'>Pink</option>
                        </select>
                        <div className='flex justify-end font-medium'>
                          <button className='bg-light-purple-1 text-white rounded-full px-5 py-2 w-1/3 shadow-md transition hover:bg-dark-purple-2' type='submit'>Save</button>
                        </div>
                      </form>
                    </div>
                  </div>
                :
                  <></>
              }
            </div>
          {/* </div> */}
        </div>
        <div className='relative w-full grow overflow-x-auto'>
          <div className='tasks-container w-full h-full absolute top-0 left-0'>
            {
              tasks.map((taskCategory, index) => {
                return <div key={index} className='bg-gray-6 h-fit rounded-md shadow-sm py-6 px-5'>{taskCategory.map((task, index) => {
                  let categoryColor = user.categories.find((taskCat) => taskCat.name == task.category)

                  return <div key={index}>
                    <div className={`${index !== 0 ? 'hidden' : 'mb-2 font-medium uppercase'} flex items-center`}><div className={`${colorVariants[categoryColor.color].bg} mr-2 p-1 rounded-full`}></div> {task.category}</div>
                    <div className={`${index !== 0 ? '' : 'mb-6'} bg-white drop-shadow-md px-4 py-5 rounded-sm`}>
                      <div className={`border-l-3 ${colorVariants[categoryColor.color].border} pl-2`}>
                        <div className='font-medium'>{task.name}</div>
                      </div>
                    </div>
                  </div>
                })}</div>
              })
            }



          </div>
        </div>

      </div>
      
      {/* <button className='bg-red-400' onClick={handleLogout}>Logout</button> */}
    </div>
  )
}

export default DashboardPage
