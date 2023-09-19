import React from 'react'
import FormLogin from '../components/FormLogin'

const LoginPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[100vh] bg-gradient-to-r from-blue-400 to-blue-300 text-gray-800 text-xl font-bold'>
      <FormLogin />
    </div>
  )
}

export default LoginPage;