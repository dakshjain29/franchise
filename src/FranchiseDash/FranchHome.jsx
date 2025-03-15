// import React from 'react'

// function FranchHome() {
//   return (
//     <div>
//         <div>

//         </div>
//         <div>

//         </div>
//     </div>
//   )
// }

// export default FranchHome

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import FranchSideBar from './FranchSideBar';
import HomePage from './HomePage';
import SalesPage from './SalesPage';
import EmployeesPage from './EmployeesPage';
import HistoryPage from './HistoryPage';
import ChartsPage from './ChartsPage';
import SettingsPage from './SettingsPage';

// Placeholder components for each section

// Side Navigation component


// Main layout that combines sidebar with content area


// Root app component that sets up the router
const FranchHome = () => {
    var em=localStorage.getItem("email");
  return (
    
      <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <FranchSideBar />
      
      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <div className="p-6"><h1 className="text-2xl font-bold">hii:{em}</h1></div>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/sales" element={<SalesPage email={em}></SalesPage>} />
          <Route path="/employees" element={<EmployeesPage email={em} />} />
          <Route path="/history" element={<HistoryPage email={em} />} />
          <Route path="/charts" element={<ChartsPage email={em} />} />
          <Route path="/settings" element={<SettingsPage email={em}/>} />
        </Routes>
      </div>
    </div>
   
  );
};

export default FranchHome;