import React from 'react'

import taskifyLogo from '../assets/taskify-transparent.png';

const Navbar = () => {
  return (
    <div className="text-white h-44 flex flex-col sm:justify-between  sm:flex-row sm:h-32 items-center p-4">
      <div className="logo">
        <img src={taskifyLogo} alt="Taskify Logo" className="h-34 cursor-pointer" />
      </div>
      <div className=" flex justify-center sm:mx-10">
        <ul className="flex gap-6 items-center text-blue-200">
          <li>Home</li>
          <li>Your Tasks</li>
          <li>About</li>
        </ul>
      </div>

    </div>
  );
};



export default Navbar
