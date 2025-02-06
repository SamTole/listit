import React from 'react'

import NavBar from '../components/NavBar'

const HomePage = () => {
  return (
    <div className='flex flex-col'>
        <NavBar />
        <div className='grid grid-cols-2 justify-items-center'>
            <div className='flex flex-col items-start'>
                <div className='text-5xl linear-gradient-purple pl-3px mb-5'>
                    <div className='bg-white pl-3'>Welcome to <span className='logo-font'>ListIt!</span></div>
                </div>
                <div className='max-w-2xl mb-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud.</div>
                <button onClick={''} className='linear-gradient-purple rounded-full font-bold p-2px drop-shadow-md'><div className='bg-white rounded-full text-transparent px-10 py-3'>Sign Up</div></button>
            </div>
            <div>bb</div>
        </div>
    </div>
  )
}

export default HomePage
