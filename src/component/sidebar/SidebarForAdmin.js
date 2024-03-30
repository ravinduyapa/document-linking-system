
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link for navigation and useLocation for getting current location
import { FaRegUserCircle } from 'react-icons/fa'; // Import icon for user profile

const SideForAdmin = () => {

  const [activeItem, setActiveItem] = useState(''); // State to manage active item in sidebar
  const location = useLocation(); // Get current location using useLocation hook

  useEffect(() => {
    // Update active item based on current location
    setActiveItem(location.pathname.replace('/', '')); // Remove leading '/' from pathname
  }, [location]);

  // Handler to set active item when clicked
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div className='w-60 bg-blue-100 fixed h-full flex flex-col items-center justify-center'>

      {/* User profile icon */}
      <FaRegUserCircle className='text-7xl -mt-48' />
      {/* User name */}
      <h1 className='text-lg text-center text-red-800 font-bold mt-4'>John Deo</h1>
      {/* User role */}
      <p className='text-xs text-center text-green-800'>Admin</p>

      {/* Sidebar navigation */}
      <ul className='mt-16 w-full'>

        {/* Sidebar item for new document */}
        <li
          className={`mt-4 hover:bg-blue-500 hover:text-white ${
            activeItem === 'new-document' ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => handleItemClick('new-document')}
        >
          {/* Link to navigate to new document */}
          <Link to="/new-document" className='text-lg text-center block py-2 px-4'>New Document</Link>
        </li>

        {/* Sidebar item for users */}
        <li
          className={`mt-4 hover:bg-blue-500 hover:text-white ${
            activeItem === 'users' ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => handleItemClick('users')}
        >
          {/* Link to navigate to users */}
          <Link to="/users" className='text-lg text-center block py-2 px-4'>Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideForAdmin;
