// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DataProvider } from './DataContext'; // Import the DataProvider from DataContext
import Documents from './component/Documents';
import Login from './component/Login';
import NewDocument from './component/NewDocument';
import Users from './component/Users';

function App() {
  return (
    <DataProvider> {/* Wrap the entire application with DataProvider */}
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/new-document" element={<NewDocument />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;
