import React from 'react'

import NavBar from '../components/NavBar'
import HomeImage from '../assets/img/home-image.png'
import HomePageBG2 from '../assets/img/home-page-background-2.png'

const HomePage = () => {
  return (
    <div className='flex flex-col relative'>
        <NavBar />
        <div className='flex items-center justify-center grow z-10 lg:px-20 lg:py-28 p-10 pb-20'>
            <div className='lg:w-1/2 flex justify-end lg:mr-20'>
              <div>
                <div className='lg:text-5xl text-3xl linear-gradient-purple pl-3px mb-6 w-fit'>
                    <div className='bg-white pl-3 font-medium'>Welcome to <span className='logo-font'>ListIt!</span></div>
                </div>
                <div className='lg:mb-10 mb-6 ml-4 lg:text-xl max-w-2xl leading-relaxed'>Simplify your workflow and boost productivity with easy-to-use features designed to keep you focused and on track.</div>
                <button onClick={''} className='linear-gradient-purple rounded-full font-bold p-2px drop-shadow-md lg:text-xl ml-4'><div className='bg-white rounded-full text-transparent px-20 py-4'><p className='linear-gradient-purple-font'>Sign Up</p></div></button>
              </div>
            </div>
            <div className='w-1/2 hidden lg:block'>
              <img src={HomeImage} alt="home-image.png" className='w-3/5 ml-20' />
            </div>
        </div>
        <img src={HomePageBG2} alt="home-page-background-1.png" className='absolute bottom-0' />
    </div>
  )
}

export default HomePage
