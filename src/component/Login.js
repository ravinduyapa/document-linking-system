import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa'; // Importing icons for username and password fields
import { useNavigate } from 'react-router-dom'; // Importing useHistory from react-router-dom

const Login = () => {
  const navigate = useNavigate(); // Initialize useHistory hook for navigation

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Handler for input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for login button click
  const handleLogin = () => {
    // Check if username and password are correct
    if (formData.username === 'admin' && formData.password === 'admin') {
      navigate('/new-document'); // Navigate to "/new-document" route for admin
    } else if (formData.username === 'user' && formData.password === 'user') {
      navigate('/documents'); // Navigate to "/documents" route for regular user
    } else {
      alert('Invalid credentials'); // Show alert for invalid credentials
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Login title */}
      <h1 className="text-6xl font-bold mb-8 text-red-500">Login</h1>

      <div className="w-80">
        <div className="relative mb-4">
          {/* Username field */}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:border-blue-500 text-blue-500"
          />
          <FaUser className="absolute left-3 top-3 text-blue-300" /> {/* Username icon */}
        </div>

        <div className="relative mb-6">
          {/* Password field */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:border-blue-500 text-blue-500"
          />
          <FaLock className="absolute left-3 top-3 text-blue-300" /> {/* Password icon */}
        </div>

        {/* Log in button */}
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full focus:outline-none"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
