import React from 'react'

import NavBar from '../components/NavBar'
import HomeImage from '../assets/img/home-image.png'
import HomePageBG2 from '../assets/img/home-page-background-2.png'

const HomePage = () => {
  return (
    <div className='flex flex-col relative h-screen pb-12'>
        <NavBar />
        <div className='flex items-center justify-center grow z-10 px-12'>
            <div className='w-1/2 flex justify-end'>
              <div className=''>
                <div className='text-5xl linear-gradient-purple pl-3px mb-6'>
                    <div className='bg-white pl-3 font-medium'>Welcome to <span className='logo-font'>ListIt!</span></div>
                </div>
                <div className='mb-6 ml-4 text-lg w-2/3'>Simplify your workflow and boost productivity with easy-to-use features designed to keep you focused and on track.</div>
                <button onClick={''} className='linear-gradient-purple rounded-full font-bold p-2px drop-shadow-md text-lg ml-4'><div className='bg-white rounded-full text-transparent px-16 py-3'><p className='linear-gradient-purple-font'>Sign Up</p></div></button>
              </div>
            </div>
            <div className='w-1/2 flex'>
              <img src={HomeImage} alt="home-image.png" className='w-2/3' />
            </div>
        </div>
        <img src={HomePageBG2} alt="home-page-background-1.png" className='fixed bottom-0' />
    </div>
  )
}

export default HomePage
