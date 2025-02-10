import { React, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import InputField from '../components/InputField';
import FormBtn from '../components/FormBtn';
import Logo from '../components/Logo';
import { useAuthStore } from '../store/authStore';
import LoginImage from '../assets/img/login-image.png';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

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
    <div className='grid grid-cols-2 h-screen relative'>
      <div className='absolute py-6 px-8'>
        <Logo />
      </div>
      <div className='flex flex-col items-center justify-center text-center'>
        <div className='w-3/5'>
          <div className='text-5xl font-semibold mb-3'>Welcome Back!</div>
          <div className='text-lg text-gray-1 font-semibold mb-8'>Please enter your credentials to log in.</div>
          <form onSubmit={handleLogin} className='flex flex-col w-full mb-8'>
            <InputField onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='Email' classes='mb-6' />
            <InputField onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Password' classes='mb-6' />
            <FormBtn text='Log In' />
          </form>
          <div className='text-gray-1'>Don't have an account? <Link to={'/signup'} className='text-light-purple-1 transition hover:text-dark-purple-2 font-bold'>Sign up here</Link></div>
        </div>
      </div>
      <div className='bg-light-purple-2 flex items-center justify-center'>
        <img src={LoginImage} alt="login-image.png" className='w-1/2' />
      </div>
    </div>

    // <motion.div
    //   initial={{opacity: 0, y: 20}}
    //   animate={{opacity: 1, y: 0}}
    //   transition={{duration: 0.5}}
    //   className='max-w-md w-full bg-gray-800 opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
    //     <div className='p-8'>
    //       <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
    //         Welcome Back
    //       </h2>

    //       <form onSubmit={handleLogin}>
    //         <Input
    //           icon={Mail}
    //           type='email'
    //           placeholder='Email Address'
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <Input
    //           icon={Lock}
    //           type='password'
    //           placeholder='Password'
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}          
    //         />

    //         {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

    //         <motion.button
    //           className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
    //           whileHover={{ scale: 1.02 }}
    //           whileTap={{ scale: 0.98 }}
    //           type='submit'
    //           disabled={isLoading}
    //         >
    //           {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : 'Login'}
    //         </motion.button>
    //       </form>
    //     </div>

    //   <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
    //     <p className='text-sm text-gray-400'>
    //       Don't have an account?{" "}
    //       <Link to={"/signup"} className='text-green-400 hover:underline'>
    //         Sign Up
    //       </Link>
    //     </p>
    //   </div>
    // </motion.div>
  )
}

export default LoginPage
