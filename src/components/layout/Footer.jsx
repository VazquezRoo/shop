import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className={` h-[300px] bg-gray-200/20 w-full max-w-[1300px] grid justify-center text-[12px] min-[600px]:text-[20px]`}>
      <div className='  max-w-[1200px] grid grid-cols-2 p-2'>

        <div className='flex flex-col justify-center items-start  '>
          <h4>Vazquez Roo</h4>
          <p>Thanks for reading!</p>
          <p><i className='bx bx-envelope'></i> vazquez.roo93@gmail.com</p>
          <p><i className='bx bx-phone' ></i> (653) 100-7177</p>
          
          <p className='pt-[30px] '>&copy; 2023 Cristian Vazquez. All rights reserved.</p>
         </div>

         <div className='grid justify-center items-center'>
          <ul className='grid gap-2'>
            <Link to={'/'} className='hover:text-purple-500'>Home</Link>
            <Link to={'/login'} className='hover:text-purple-500'>Login</Link>
            <Link to={'/purchases'} className='hover:text-purple-500'>Purchases</Link>
          </ul>
         </div>

      </div>
    </div>
  )
}

export default Footer