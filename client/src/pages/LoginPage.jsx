import { React, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import InputField from '../components/InputField';
import FormBtn from '../components/FormBtn';
import Logo from '../components/Logo';
import { useAuthStore } from '../store/authStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import LoginImg from '../assets/img/loginImg.jsx'

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const { login, isLoading, error, resetErrorMsg } = useAuthStore()

  useEffect(() => {
    resetErrorMsg()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='md:grid grid-cols-5 flex flex-col h-screen relative'>
      <div className='md:absolute md:flex-none col-span-5 flex justify-start items-start w-full top-0 left-0 py-6 px-8'>
        <Logo />
      </div>
      <div className='col-span-3 flex flex-col items-center justify-center text-center w-full md:max-lg:pt-28 md:max-lg:pb-20 pb-20 pt-10 lg:pb-0 lg:pt-0 grow'>
        <motion.div className='lg:w-3/5 w-full lg:px-0 md:max-lg:px-20 px-10'
          initial={{ opacity: 0, y: 30}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut', delay: 0.15}}
        >
          <div className='lg:text-5xl text-4xl font-medium lg:mb-5 mb-3'>Welcome Back!</div>
          <div className='text-lg text-gray-1 font-medium mb-10'>Please enter your credentials to sign in.</div>
          <form onSubmit={handleLogin} className='flex flex-col items-center w-full mb-10'>
            <div className={ `w-full bg-gray-8 px-6 flex items-center rounded-full text-gray-4 shadow mb-6 max-w-lg`}>
              <FontAwesomeIcon icon={faEnvelope} />
              <InputField onChange={(e) => setEmail(e.target.value)} name='email' value={email} type='email' placeholder='Email' />
            </div>
            <div className={`w-full bg-gray-8 px-6 flex items-center rounded-full text-gray-4 shadow mb-6 max-w-lg`}>
              <FontAwesomeIcon icon={faLock} />
              <InputField onChange={(e) => setPassword(e.target.value)} name='password' value={password} type='password' placeholder='Password' classes='mb-10 max-w-lg' />
            </div>
            <FormBtn text='SIGN IN' />
            {error && <p className='text-red-2 font-semibold mt-6'>{error}</p>}
          </form>
          <div className='text-gray-1'>Don't have an account? <Link to={'/signup'} className='text-light-purple-1 transition hover:text-dark-purple-2 font-semibold border-b-2 border-transparent hover:border-light-purple-1'>Sign up here</Link></div>
        </motion.div>
      </div>
      <motion.div className='col-span-2 bg-light-purple-2 flex items-center justify-center'
        initial={{ opacity: 0, y: -50}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.15}}
      >
      <LoginImg />
    </motion.div>
  </div>
  )
}

export default LoginPage
