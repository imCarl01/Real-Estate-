import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="bg-violet-200">
         <div className="bg-violet-200 flex justify-between items-center max-w-6xl mx-auto p-5">
        <Link to="/">
          <h1 className='text-2xl font-bold text-gray-600 '>realEstate</h1>
        </Link>  
      
      <form action="">
   
          <input type="search" placeholder='Search...' className='focus:outline-hidden ml-10' />
     
        
      </form>
      <ul className='flex space-x-10 flex-wrap'>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
        <li>About</li>
        </Link>
        
        <Link to="/service">
        <li>Service</li>
        </Link>
        <Link to="/contact">
        <li>Contact</li>
        </Link>

      </ul>
    </div>
    </div>
 
  )
}

export default Navbar