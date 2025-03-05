import React from 'react'
import { motion } from 'framer-motion'

const FormBtn = (props) => {
  return (
    <motion.button type='submit' className='bg-light-purple-1 rounded-full text-white py-4 px-28 font-semibold shadow-md'
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.3, ease: 'easeInOut', delay: 0.05 },
        background: '#534CC7'
      }}
    >
      {props.text}
    </motion.button>
  )
}

export default FormBtn
