// DataContext.js
'use client'
import React, { createContext, useState } from 'react';

// Create the context
export const DataContext = createContext();

// Create a provider to wrap components that need access to the context
export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};
