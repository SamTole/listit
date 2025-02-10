import React from 'react'
import { Check, X } from 'lucide-react';

const PasswordCriteria = ({password}) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains a special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className='mt-3 space-y-1'>
      {
        criteria.map((item, index) => (
          <div key={item.label} className='flex items-center text-xs'>
            {item.met ? (
              <Check className='size-4 text-green-1 mr-2' />
            ) : (
              <X className='size-4 text-gray-1 mr-2' />
            )}
            <span className={item.met ? 'text-green-500' : 'text-gray-400'}>{item.label}</span>
          </div>
        ))
      }
    </div>
  )
}

const PasswordStrengthMeter = ({password}) => {
  const getStrength = (pass) => {
    let strength = 0;

    if (pass.length >= 6) {
      strength++;
    }
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) {
      strength++;
    }
    if (pass.match(/\d/)) {
      strength++;
    }
    if (pass.match(/[^a-zA-Z\d]/)) {
      strength++;
    }
    return strength;
  };

  const strength = getStrength(password);

  const getColor = (strength) => {
    if (strength === 0) {
      return 'bg-gray-3';
    }
    if (strength === 1) {
      return 'bg-red-1';
    }
    if (strength === 2) {
      return 'bg-orange-1';
    }
    if (strength === 3) {
      return 'bg-yellow-1';
    }
    return 'bg-green-1';
  }

  const getStrengthText = (strength) => {
    if (strength === 0) {
      return 'Very Weak';
    }
    if (strength === 1) {
      return 'Weak';
    }
    if (strength === 2) {
      return 'Fair';
    }
    if (strength === 3) {
      return 'Good';
    }
    return 'Strong';
  }

  return (
    <div className='px-2 mb-6'>
      <div className='flex justify-between items-center mb-2'>
        <span className='text-gray-1'>Password strength</span>
        <span className='text-gray-1'>{getStrengthText(strength)}</span>
      </div>
      
      <div className='flex bg-gray-3 rounded-full overflow-clip'>
        {[...Array(4)].map((_, index) => (
          <div 
            key={index}
            className={`py-1 w-1/4 transition-colors duraction-300 ${index < strength ? getColor(strength) : ''}`} />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  )
}

export default PasswordStrengthMeter
