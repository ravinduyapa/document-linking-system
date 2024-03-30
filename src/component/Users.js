import React, { useState, useEffect } from 'react';
import SideForAdmin from './sidebar/SidebarForAdmin'; // Importing sidebar component
import { useNavigate } from 'react-router-dom'; // Importing hook for navigation
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons for edit and delete actions

const Users = () => {
  const navigate = useNavigate(); // Initializing navigation function
  const [usersData, setUsersData] = useState(() => {
    const storedData = localStorage.getItem('usersData'); // Retrieving data from local storage
    return storedData ? JSON.parse(storedData) : []; // Parsing data if available, otherwise initializing as empty array
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userRole: '',
  });
  const [editId, setEditId] = useState(null); // Initializing state to track edited user ID

  useEffect(() => {
    localStorage.setItem('usersData', JSON.stringify(usersData)); // Saving usersData to local storage on change
  }, [usersData]);

  // Handler for input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for creating or updating a user
  const handleCreateUser = () => {
    if (editId !== null) {
      // Update existing user if editId is not null
      setUsersData((prevUsersData) =>
        prevUsersData.map((user) =>
          user.id === editId ? { ...formData, id: user.id } : user
        )
      );
      setEditId(null); // Resetting editId after update
    } else {
      // Create new user if editId is null
      setUsersData((prevUsersData) => [
        ...prevUsersData,
        { ...formData, id: prevUsersData.length + 1 }, // Adding new user with incremented ID
      ]);
    }
    setFormData({
      firstName: '',
      lastName: '',
      userRole: '',
    }); // Resetting form data after submission
  };

  // Handler for editing a user
  const handleEditUser = (id) => {
    const userToEdit = usersData.find((user) => user.id === id);
    if (userToEdit) {
      setFormData({
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        userRole: userToEdit.userRole,
      }); // Setting form data for editing
      setEditId(id); // Setting editId to track the edited user
    }
  };

  // Handler for deleting a user
  const handleDeleteUser = (id) => {
    const updatedUsers = usersData.filter((user) => user.id !== id); // Filtering out the user to be deleted
    setUsersData(updatedUsers); // Updating usersData without the deleted user
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
      <div>
        <SideForAdmin /> {/* Rendering sidebar component */}
      </div>

      <div className="ml-80 flex flex-col ">
        <h1 className='text-3xl font-bold mt-4'>User Management</h1> {/* Page title */}
        
        {/* Input fields for creating/editing user */}
        <div className='flex flex-row mt-8'>
          <input
            type='text'
            placeholder='First Name *'
            name='firstName'
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className='border border-black rounded px-4 w-72 focus:outline-none focus:border-blue-500 text-blue-800'
          />
          <input
            type='text'
            placeholder='Last Name *'
            name='lastName'
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className='border border-black rounded px-4 w-72 focus:outline-none focus:border-blue-500 text-blue-800 ml-16'
          />
        </div>

        {/* Dropdown for selecting user role */}
        <div className='flex flex-col mt-4'>
          <select
            name='userRole'
            value={formData.userRole}
            onChange={handleInputChange}
            required
            className='border border-black rounded w-72 px-4 focus:outline-none focus:border-blue-500 text-blue-800'
          >
            <option value='' disabled>Select Role</option>
            <option value='admin'>Admin</option>
            <option value='employee'>Employee</option>
            <option value='user'>User</option>
          </select>

          {/* Button for creating/updating user */}
          <button
            className='border border-green-500 w-20 rounded-lg text-white bg-green-400 hover:bg-green-800 mt-4'
            onClick={handleCreateUser}
          >
            {editId !== null ? 'Update' : 'Create'}
          </button>
        </div>

        {/* Table for displaying user data */}
        <div className="mt-8">
          <table className="w-full border-collapse border border-blue-500">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">First Name</th>
                <th className="py-2 px-4">Last Name</th>
                <th className="py-2 px-4">User Role</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.firstName}</td>
                  <td className="py-2 px-4">{user.lastName}</td>
                  <td className="py-2 px-4">{user.userRole}</td>
                  <td className="py-2 px-4">
                    {/* Button for editing user */}
                    <button
                      className="mr-2"
                      onClick={() => handleEditUser(user.id)}
                    >
                      <FaEdit className="text-blue-500 hover:text-blue-700 mr-4" />
                    </button>
                    {/* Button for deleting user */}
                    <button onClick={() => handleDeleteUser(user.id)}>
                      <FaTrash className="text-red-500 hover:text-red-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Logout button */}
        <div className="mt-auto ml-auto mb-8">
          <button className="bg-blue-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
