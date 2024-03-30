import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [tableData, setTableData] = useState(() => {
    const storedData = localStorage.getItem('tableData');
    return storedData ? JSON.parse(storedData) : [];
  });

  const addRowToTable = (rowData) => {
    setTableData((prevData) => [...prevData, rowData]);
  };

  const deleteRow = (index) => {
    setTableData((prevData) => prevData.filter((_, idx) => idx !== index));
  };

  const editRow = (index, newData) => {
    setTableData((prevData) =>
      prevData.map((rowData, idx) => (idx === index ? { ...rowData, ...newData } : rowData))
    );
  };

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);

  const values = {
    tableData,
    addRowToTable,
    deleteRow,
    editRow, // Include editRow in the values object
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
