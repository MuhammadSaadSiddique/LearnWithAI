import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className=' flex justify-between pt-3'>
    <nav className='  w-[15%] text-medium font-semibold text-lg  '>
      <a to="/about" className=' mx-3' >Api</a>
      <a to="/api" className='mx-3' >About</a>
       
    </nav>
    <div className=' '>

    <h2 className=' text-secondary font-bold text-3xl'>LOGO</h2>
    </div>
   
    </header>
  )
}

export default Header