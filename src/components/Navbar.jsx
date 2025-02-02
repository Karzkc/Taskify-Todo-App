import React from 'react'

import taskifyLogo from '../assets/taskify-transparent.png';

const Navbar = () => {
  return (
    <div className='text-white   justify-between border-white h-26 flex items-center '>
      <div className="logo">
        <img src={taskifyLogo} alt="Taskify Logo" className="h-34 cursor-pointer" />
      </div>
      <ul className='flex gap-6  transition-all mx-9 text-blue-200'>
        <li>Home</li>
        <li>Your Tasks</li>
        <li>About</li>
        <li></li>
      </ul>
    </div>
  );
};



export default Navbar
  