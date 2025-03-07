import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InputField from '../components/InputField';
import FormBtn from '../components/FormBtn';
import Logo from '../components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import RegisterImg from '../assets/img/registerImg';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signup, error, isLoading, resetErrorMsg } = useAuthStore();

  useEffect(() => {
    resetErrorMsg()
  }, [])

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password, name);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='md:grid grid-cols-5 flex md:flex-col flex-col-reverse md:h-screen relative'>
      <div className='absolute col-span-5 flex justify-start items-start w-full top-0 left-0 py-6 px-8 z-10'>
        <Logo />
      </div>
      <motion.div className='col-span-2 bg-light-purple-2 flex items-center justify-center'
        initial={{ opacity: 0, y: -50}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.15}}
      >
        <RegisterImg />
      </motion.div>
      <div className='col-span-3 flex flex-col items-center justify-center text-center w-full md:pt-28 pb-20 pt-32 grow'>
        <motion.div className='lg:w-3/5 w-full lg:px-0 md:max-lg:px-20 px-10'
          initial={{ opacity: 0, y: 30}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut', delay: 0.15}}
        >
          <div className='lg:text-5xl text-4xl font-medium lg:mb-5 mb-3'>Create Account</div>
          <div className='text-lg text-gray-1 font-semibold mb-10'>Please enter your credentials to sign up.</div>
          <form onSubmit={handleSignUp} className='flex flex-col items-center w-full mb-10'>
            <div className={ `w-full bg-gray-8 px-6 flex items-center rounded-full text-gray-4 shadow mb-6 max-w-lg`}>
              <FontAwesomeIcon icon={faUser} />
              <InputField onChange={(e) => setName(e.target.value)}  name='name' value={name} type='text' placeholder='Full Name' />
            </div>
            <div className={ `w-full bg-gray-8 px-6 flex items-center rounded-full text-gray-4 shadow mb-6 max-w-lg`}>
              <FontAwesomeIcon icon={faEnvelope} />
              <InputField onChange={(e) => setEmail(e.target.value)} name='email' value={email} type='email' placeholder='Email' />
            </div>
            <div className={ `w-full bg-gray-8 px-6 flex items-center rounded-full text-gray-4 shadow mb-6 max-w-lg`}>
              <FontAwesomeIcon icon={faLock} />
              <InputField onChange={(e) => setPassword(e.target.value)} name='password' value={password} type='password' placeholder='Password' />
            </div>
            <div className='w-full my-1'>
              <div className='max-w-lg mx-auto'>
                <PasswordStrengthMeter password={password} />
              </div>
            </div>
            <FormBtn text='SIGN UP' />
            {error && <p className='text-red-2 font-semibold mt-6'>{error}</p>}
          </form>
          <div className='text-gray-1'>Already have an account? <Link to={'/login'} className='text-light-purple-1 transition hover:text-dark-purple-2 font-semibold border-b-2 border-transparent hover:border-light-purple-1'>Log in here</Link></div>
        </motion.div>
      </div>
    </div>
  )
}

export default SignUpPage

