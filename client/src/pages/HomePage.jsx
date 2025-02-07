import React from 'react'

import NavBar from '../components/NavBar'
import HomeImage from '../assets/img/home-image.png'
import HomePageBG2 from '../assets/img/home-page-background-2.png'

const HomePage = () => {
  return (
    <div className='flex flex-col relative pb-24'>
        <NavBar />
        <div className='flex items-center justify-center mt-32 z-10'>
            <div className='w-42rem mb-20'>
                <div className='text-5xl linear-gradient-purple pl-3px mb-6'>
                    <div className='bg-white pl-3'>Welcome to <span className='logo-font'>ListIt!</span></div>
                </div>
                <div className='mb-6 text-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud.</div>
                <button onClick={''} className='linear-gradient-purple rounded-full font-bold p-2px drop-shadow-md text-lg'><div className='bg-white rounded-full text-transparent px-14 py-3'><p className='linear-gradient-purple-font'>Sign Up</p></div></button>
            </div>
            <div className='w-30rem ml-48'>
              <img src={HomeImage} alt="home-image.png" />
            </div>
        </div>
        <img src={HomePageBG2} alt="home-page-background-1.png" className='absolute bottom-0' />
    </div>
  )
}

export default HomePage
