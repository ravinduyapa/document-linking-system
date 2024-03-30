// Importing necessary modules and components
import React, { useState } from 'react';
import { useDataContext } from '../DataContext'; // Importing DataContext for data management
import SideForAdmin from './sidebar/SidebarForAdmin'; // Importing sidebar component
import { useNavigate } from 'react-router-dom'; // Importing hook for navigation

const NewDocument = () => {
  // Accessing data management functions from DataContext
  const { addRowToTable } = useDataContext();
  const navigate = useNavigate(); // Initializing navigation function
  const [formData, setFormData] = useState({
    firstName: '',
    link: '',
    userRole: '',
  });

  // Handler for input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for creating a new document
  const handleCreate = () => {
    addRowToTable(formData); // Adding formData as a new row to the table
    alert('Document created successfully'); // Showing success message
    setFormData({ // Clearing form data after creating the document
      firstName: '',
      link: '',
      userRole: '',
    });
  };

  // Handler for logout action
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?'); // Confirmation message

    if (confirmLogout) {
      navigate('/'); // Navigating to home page on logout
    }
  };

  return (
    <div className="flex bg-gray-300 h-screen bg-opacity-20">
      {/* Sidebar */}
      <div>
        <SideForAdmin/> {/* Rendering sidebar component */}
      </div>

      {/* Main Content */}
      <div className="flex flex-col ml-80">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mt-4">Create New Document</h1>

        <div className="flex flex-col mt-8">
          {/* First Name Input Field */}
          <input
            type="text"
            placeholder="Name *"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="border border-black rounded w-96 px-4 focus:outline-none focus:border-blue-500 text-blue-800 mb-4"
          />

          {/* Link Input Field */}
          <input
            type="text"
            placeholder="Link *"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            required
            className="border border-black rounded w-96 px-4 focus:outline-none focus:border-blue-500 text-blue-800 mb-4"
          />

          {/* Select Role Dropdown */}
          <select
            name="userRole"
            value={formData.userRole}
            onChange={handleInputChange}
            required
            className="border border-black rounded w-96 px-4 focus:outline-none focus:border-blue-500 text-blue-800"
          >
            <option value="" disabled>Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="user">User</option>
          </select>

          {/* Create Button */}
          <button
            onClick={handleCreate}
            className="border border-green-500 w-20 rounded-lg text-white bg-green-400 hover:bg-green-800  mt-8"
          >
            Create
          </button>
        </div>

        {/* Logout button */}
        <div className="mt-auto ml-auto -mr-96 mb-8">
          <button className="bg-blue-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewDocument;
