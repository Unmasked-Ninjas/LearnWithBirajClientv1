import React from 'react'
import { PiStudentBold } from "react-icons/pi";
const Header = () => {
  return (
    <div className='flex justify-center items-center gap-5 text-3xl md:text-4xl pt-3 relative  '>
        <h1 className='dark:text-white cursor-pointer'>Learn With Biraj  </h1>
        <PiStudentBold className='dark:text-white'/>
    </div>
  )
}

export default Header
