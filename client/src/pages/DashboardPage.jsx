import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faPlus, faXmark, faCheckCircle, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import Menu from '../components/Menu';
import FormBtn from '../components/FormBtn';
import moment from '../../node_modules/moment/src/moment'

const DashboardPage = () => {
  const [taskFormOpen, setTaskFormOpen] = useState(false)
  const [categoryFormOpen, setCategoryFormOpen] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [categoryColor, setCategoryColor] = useState('')
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskCategory, setTaskCategory] = useState('default')
  const [taskDeadline, setTaskDeadline] = useState('')
  const [tasks, setTasks] = useState([])
  const [todaysDate, setTodaysDate] = useState(new Date())
  const [currentDate, setCurrentDate] = useState(new Date())
  const [dayBefore, setDayBefore] = useState(new Date())
  const [dayAfter, setDayAfter] = useState(new Date())
  const [taskClicked, setTaskClicked] = useState(null)
  const { user, logout, addCategory, addTask, editTask, completeTask, incompleteTask } = useAuthStore();

  const colorVariants = {
    red: {bg: 'bg-red-category', border: 'border-red-category', text: 'text-red-category'},
    orange: {bg: 'bg-orange-category', border: 'border-orange-category', text: 'text-orange-category'},
    yellow: {bg: 'bg-yellow-category', border: 'border-yellow-category', text: 'text-yellow-category'},
    green: {bg: 'bg-green-category', border: 'border-green-category', text: 'text-green-category'},
    blue: {bg: 'bg-blue-category', border: 'border-blue-category', text: 'text-blue-category'},
    purple: {bg: 'bg-purple-category', border: 'border-purple-category', text: 'text-purple-category'},
    pink: {bg: 'bg-pink-category', border: 'border-pink-category', text: 'text-pink-category'},
  }

  const options = {
    month: 'short',
    day: 'numeric',
  }
  
  useEffect(() => {
    setDayBefore(dayBefore.setDate(currentDate.getDate() - 1))
    setDayBefore(new Date(dayBefore))
    setDayAfter(dayAfter.setDate(currentDate.getDate() + 1))
    setDayAfter(new Date(dayAfter))

    let filteredTasks = []

    const uniqueCategories = [...new Set(user.tasks.map(task => task.category))]

    uniqueCategories.forEach((category) => {
      let arr = user.tasks.filter((task) => task.category == category)
      arr = arr.filter((task) => new Date(task.deadline).toLocaleDateString() == currentDate.toLocaleDateString())
      filteredTasks.push(arr)
    })

    filteredTasks.forEach((taskArr) => {
      taskArr.forEach((task) => {
        task.deadline = new Date(task.deadline)
      })
    })

    filteredTasks.forEach((taskArr) => {
      taskArr.sort((a, b) => a.deadline - b.deadline)
    })
    
    let allTasks = []
    filteredTasks.forEach((taskArr) => {
      let completeTasks = []
      let firstTaskCompleted = false
      for (let i = 0; i < taskArr.length; i++) {
        if (taskArr[i].complete) {
          if (!firstTaskCompleted) {
            firstTaskCompleted = true
            taskArr[i].firstCompleted = true
          }
          completeTasks.push(taskArr[i])
          taskArr.splice(i, 1)[0]
          i--
        }
      }

      allTasks.push(taskArr.concat(completeTasks))
    })

    filteredTasks = allTasks
    console.log('all', allTasks)
    
    setTasks(filteredTasks)
  }, [user, currentDate])

  useEffect(() => {
    if (taskClicked) {
      setTaskName(taskClicked.name)
      setTaskDescription(taskClicked.description)
      setTaskCategory(taskClicked.category)
      setTaskDeadline(moment(taskClicked.deadline).format('YYYY-MM-DDTHH:mm'))
    }
  }, [taskClicked])

  // const handleLogout = () => {
  //   logout();
  // }
  
  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    await addCategory(categoryName, categoryColor)
  }

  const handleTaskSubmit = async (e) => {
    e.preventDefault()

    if (taskClicked) {
      await editTask(taskClicked.id, taskName, taskDescription, taskCategory, taskDeadline)
    }
    else {
      await addTask(taskName, taskDescription, taskCategory, taskDeadline)
      setTaskName('')
      setTaskDescription('')
      setTaskCategory('default')
      setTaskDeadline('')
    }
  }

  const handleTaskFormClosed = () => {
    setTaskFormOpen(false)
    setTaskName('')
    setTaskDescription('')
    setTaskCategory('default')
    setTaskDeadline('')
    setTaskClicked(null)
  }

  const markTaskComplete = async (id) => {
    await completeTask(id)
  }

  const markTaskIncomplete = async (id) => {
    await incompleteTask(id)
  }

  const getDateBefore = () => {
    setCurrentDate(dayBefore)

    let dateNow = dayBefore
    let newDayBefore = dateNow.setDate(dateNow.getDate() - 1)
    let newDayAfter = dateNow.setDate(dateNow.getDate() + 2)

    setDayBefore(dayBefore.setDate(currentDate.getDate() - 1))
    setDayBefore(new Date(newDayBefore))
    setDayAfter(dayAfter.setDate(currentDate.getDate() + 2))
    setDayBefore(new Date(newDayBefore))
    setDayAfter(new Date(newDayAfter))
  }

  const getDateAfter = () => {
    setCurrentDate(dayAfter)
    
    let dateNow = dayAfter
    let newDayAfter = dateNow.setDate(dateNow.getDate() + 1)
    let newDayBefore = dateNow.setDate(dateNow.getDate() - 2)

    setDayBefore(dayBefore.setDate(currentDate.getDate() - 2))
    setDayBefore(new Date(newDayBefore))
    setDayAfter(dayAfter.setDate(currentDate.getDate() + 1))
    setDayBefore(new Date(newDayBefore))
    setDayAfter(new Date(newDayAfter))
  }

  return (
    <div className={`bg-light-purple-2 h-screen flex flex-col`}>
      {taskFormOpen || categoryFormOpen ? <div className='fixed h-screen w-screen bg-white opacity-60 z-10'></div> : <></>}
      <Menu />
      <div className='flex items-center justify-between px-16 py-8'>
        {/* <div className='flex'> */}
          <div className='flex items-center'>
            <button onClick={getDateBefore} className='text-2xl text-gray-4 transition hover:text-gray-5'>{todaysDate.toLocaleDateString() == dayBefore.toLocaleDateString() ? 'Today' : dayBefore.toLocaleDateString(undefined, options)}</button>
            <button className='text-4xl mx-8 font-medium flex flex-col text-gray-5'>{todaysDate.toLocaleDateString() == currentDate.toLocaleDateString() ? 'Today' : currentDate.toLocaleDateString(undefined, options)}
              <div className='flex justify-center'>
                <div className='border-b-3 border-light-purple-1 pb-2 w-1/3'></div>
              </div>
            </button>
            <button onClick={getDateAfter} className='text-2xl text-gray-4 hover:text-gray-5'>{todaysDate.toLocaleDateString() == dayAfter.toLocaleDateString() ? 'Today' : dayAfter.toLocaleDateString(undefined, options)}</button>
          </div>
          <div className='flex items-center'>
            <button onClick={() => setTaskFormOpen(true)} className='font-medium border-2 border-light-purple-5 text-dark-purple-2 py-3 px-5 rounded-full shadow-sm flex items-center transition hover:bg-light-purple-5 hover:border-light-purple-3'><FontAwesomeIcon className='mr-3' icon={faPlus} size='sm' />
            Task</button>
            <button onClick={() => setCategoryFormOpen(true)} className='font-medium border-2 border-light-purple-5 text-dark-purple-2 py-3 px-5 rounded-full shadow-sm flex items-center transition hover:bg-light-purple-5 hover:border-light-purple-3 ml-3'><FontAwesomeIcon className='mr-4' icon={faPlus} size='sm' />
            Category</button>
            {
              taskFormOpen ? 
                <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-10'>
                  <div className='bg-white rounded-b-md rounded-t-sm overflow-clip w-1/3 shadow-xl shadow-light-purple-2'>
                    <div className='border-t-4 border-light-purple-1 bg-light-purple-2 py-4 px-4 text-light-purple-1 flex items-center justify-between'>
                      <div>{taskClicked ? 'Edit Task' : 'Add New Task'}</div>
                      <button onClick={handleTaskFormClosed}><FontAwesomeIcon className='text-gray-4 transition hover:text-light-purple-1' icon={faXmark} size='lg' /></button>
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
                          <select onChange={(e) => setTaskCategory(e.target.value)} defaultValue={'default'} value={taskCategory} className='border-1 border-gray-3 rounded-md p-3'>
                          `<option value="default" disabled></option>
                            {
                              user.categories.map((category, index) => 
                                <option key={index}>{category.name}</option>
                              )
                            }
                          </select>
                        </div>
                        <div className='flex flex-col w-1/2 ml-2'>
                          <label className='mb-2'>Due Date & Time</label>
                          <input onChange={(e) => setTaskDeadline(e.target.value)} value={taskDeadline} type="datetime-local" className='border-1 border-gray-3 rounded-md py-2 px-3' />
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
      <div className='w-full flex flex-col grow min-h-0'>
        <div className='flex flex-col grow w-full overflow-x-auto'>
          <div className='tasks-container w-full px-16'>
            {
              tasks.map((taskCategory, index) => {
                return <div key={index} className={`${!taskCategory.length ? 'hidden' : ''} min-h-0 pr-3 overflow-y-auto`}>{taskCategory.map((task, index) => {
                  let categoryColor = user.categories.find((taskCat) => taskCat.name == task.category)

                  return <div key={index}>
                    <div className={`${index !== 0 ? 'hidden' : 'mb-3 font-medium uppercase'} ${colorVariants[categoryColor.color].bg} flex items-center justify-between px-7 py-5 rounded-sm shadow text-white`}>
                      <div>{task.category}</div>           
                      <FontAwesomeIcon icon={faEllipsis} size='lg' />
                    </div>
                    <div onClick={() => {setTaskFormOpen(true); setTaskClicked(task)}} className={`${index > 0 ? 'mt-3' : ''} ${task.complete ? 'bg-green-1 transition hover:bg-green-3' : 'bg-white transition hover:bg-gray-3'} border-l-4 ${task.complete ? 'border-green-2' : colorVariants[categoryColor.color].border} drop-shadow-md p-5 rounded rounded-l-none flex items-center cursor-pointer`}>
                      {
                        task.complete ?
                          <button onClick={(e) => {markTaskIncomplete(task.id); e.stopPropagation()}}>
                            <FontAwesomeIcon className={`text-green-category bg-white rounded-full transition hover:text-red-category hover:bg-white`} icon={faCheckCircle} size='3x' />
                          </button>
                        :
                          <button onClick={(e) => {markTaskComplete(task.id); ; e.stopPropagation()}}>
                            <FontAwesomeIcon className={`text-gray-8 bg-gray-2 rounded-full transition hover:text-green-category hover:bg-white`} icon={faCheckCircle} size='3x' />
                          </button>
                      }
                      <div className={`font-medium pl-5`}>
                        <div className='mb-1'>{task.name}</div>
                        <div className='text-gray-7 mb-4 font-normal line-clamp-1'>{task.description}</div>
                        <div className={`${task.complete ? 'text-green-2' : colorVariants[categoryColor.color].text}`}>{new Date(task.deadline).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</div>
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
