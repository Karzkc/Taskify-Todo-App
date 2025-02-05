import React from 'react'
import { LuGithub } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 left-0 text-center py-4 bg-[rgb(21,16,28)] text-gray-300 text-sm flex flex-col items-center"> {/* Flex on the footer */}
      <p className="flex items-center">
        Made with ❤️ by &nbsp;
        <a href="https://www.github.com/karzkc" target="_blank" rel="noopener noreferrer" className="flex items-center">
          Kartik Khiriya - 
          <LuGithub className='cursor-pointer ml-2' />
        </a>
      </p>
      <p>&copy; {new Date().getFullYear()} All Rights Reserved </p>
    </footer>

  );
};

export default Footer;
