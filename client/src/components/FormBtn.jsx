import React from 'react'
import { motion } from 'framer-motion'

const FormBtn = (props) => {
  return (
    <motion.button type='submit' className='bg-light-purple-1 rounded-full text-white py-4 px-28 font-semibold shadow-md'
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2, ease: 'easeInOut' },
        background: '#534CC7'
      }}
      transition={{
        duration: 0.2,
        ease: 'easeInOut',
        delay: 0.02
      }}
      whileTap={{
        scale: 1,
        transition: { duration: 0.1, ease: 'easeOut' },
      }}
    >
      {props.text}
    </motion.button>
  )
}

export default FormBtn
