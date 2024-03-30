import React, { useState } from 'react';
import { FaSearch, FaTrash, FaEdit } from 'react-icons/fa'; // Import icons for search, delete, and edit
import { useDataContext } from '../DataContext'; // Import context for data management
import SidebarForUser from './sidebar/SidebarForUser'; // Import sidebar component for user
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation

const Documents = () => {
    const { tableData, deleteRow, editRow } = useDataContext(); // Get data context for table operations
    const navigate = useNavigate(); // Initialize useHistory hook for navigation

    const [isEditing, setIsEditing] = useState(false); // State for editing mode
    const [editedIndex, setEditedIndex] = useState(null); // State for edited row index
    const [editedData, setEditedData] = useState({ // State for edited row data
        firstName: '',
        link: '',
        userRole: '',
    });
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [orderByRole, setOrderByRole] = useState(''); // State for ordering by user role

    // Handler for editing a table row
    const handleEdit = (index) => {
        const rowDataToEdit = { ...tableData[index] };
        setEditedData(rowDataToEdit);
        setIsEditing(true);
        setEditedIndex(index);
    };

    // Handler for saving edited row data
    const handleSaveEdit = () => {
        editRow(editedIndex, editedData);
        setIsEditing(false);
        setEditedData({
            firstName: '',
            link: '',
            userRole: '',
        });
        setEditedIndex(null);
    };

    // Handler for canceling edit mode
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedData({
            firstName: '',
            link: '',
            userRole: '',
        });
        setEditedIndex(null);
    };

    // Handler for input field changes during edit
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handler for search box
    const handleSearch = (query) => {
        const filteredData = tableData.filter((rowData) => {
            const fullName = `${rowData.firstName} ${rowData.lastName}`.toLowerCase();
            const searchLower = query.toLowerCase();
            return fullName.includes(searchLower) && (rowData.userRole === orderByRole || orderByRole === '');
        });
        return filteredData;
    };

    // Handler for logging out
    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');

        if (confirmLogout) {
            navigate('/');
        }
    };

    return (
        <div className="flex bg-gray-300 h-screen bg-opacity-20">
            {/* Import sidebar component */}
            <div>
                <SidebarForUser />
            </div>

            <div className="flex flex-col ml-80">
                {/* Page Title */}
                <h1 className='text-3xl font-bold mt-4'>Documents</h1>
                <div className='flex flex-col mt-8'>
                    <div className="flex items-center border border-blue-300 rounded">
                        {/* Search box */}
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="outline-none flex-1 px-4 text-blue-800"
                        />
                        <FaSearch
                            className="text-blue-500 cursor-pointer"
                            onClick={() => handleSearch(searchQuery)}
                        />
                    </div>

                    {/* Order by user role */}
                    <div>
                        <select
                            name='userRole'
                            value={orderByRole}
                            onChange={(e) => setOrderByRole(e.target.value)}
                            required
                            className='border border-black rounded px-4 focus:outline-none focus:border-blue-500 mt-4 text-blue-800'
                        >
                            <option value='' disabled>Select Role</option>
                            <option value='admin'>Admin</option>
                            <option value='employee'>Employee</option>
                            <option value='user'>User</option>
                        </select>
                    </div>

                    {/* Table */}
                    <table className="mt-8">
                        <thead style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '16px' }}>#</th>
                                <th style={{ padding: '16px' }}>First Name</th>
                                <th style={{ padding: '16px' }}>Link</th>
                                <th style={{ padding: '16px' }}>Role</th>
                                <th style={{ padding: '16px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {handleSearch(searchQuery).map((rowData, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                                    <td style={{ padding: '8px' }}>{index + 1}</td>
                                    <td style={{ padding: '8px' }}>{isEditing && editedIndex === index ? (
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={editedData.firstName}
                                            onChange={handleInputChange}
                                        />
                                    ) : rowData.firstName}</td>
                                    <td style={{ padding: '8px' }}>{isEditing && editedIndex === index ? (
                                        <input
                                            type="text"
                                            name="link"
                                            value={editedData.link}
                                            onChange={handleInputChange}
                                        />
                                    ) : rowData.link}</td>
                                    <td style={{ padding: '8px' }}>{isEditing && editedIndex === index ? (
                                        <select
                                            name="userRole"
                                            value={editedData.userRole}
                                            onChange={handleInputChange}
                                        >
                                            <option value='' disabled>Select Role</option>
                                            <option value='user'>Admin</option>
                                            <option value='guest'>Employee</option>
                                            <option value='guest'>User</option>
                                        </select>
                                    ) : rowData.userRole}</td>
                                    <td style={{ padding: '8px' }}>
                                        {isEditing && editedIndex === index ? (
                                            <>
                                                <button
                                                    onClick={handleSaveEdit}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded " onClick={() => handleEdit(index)}><FaEdit /></button>
                                        )}
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={() => deleteRow(index)}><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Table end */}
                </div>
                {/* Logout button */}
                <div className="mt-auto ml-auto -mr-96 mb-8">
                    <button className="bg-blue-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded" onClick={handleLogout} >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Documents;
