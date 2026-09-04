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

import { Routes, Route } from 'react-router-dom';
import FranchSideBar from './FranchSideBar';
import HomePage from './HomePage';
import SalesPage from './SalesPage';
import HistoryPage from './HistoryPage';
import ChartsPage from './ChartsPage';
import SettingsPage from './SettingsPage';
import { getAuth } from '../lib/auth';

// Placeholder components for each section

// Side Navigation component

// Main layout that combines sidebar with content area


// Root app component that sets up the router
const FranchHome = () => {
    const em = getAuth()?.email;

  return (
    
      <div className="min-h-screen bg-[#f4f5f2] text-[#23312d] lg:flex">
      <FranchSideBar />
      
      {/* Main content area */}
      <div className="min-w-0 flex-1 overflow-auto">
        <header className="border-b border-[#dce2dc] bg-[#fbfcf9] px-5 py-5 lg:px-10"><div className="mx-auto flex max-w-6xl items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#668077]">FranchiseHub</p><h1 className="mt-1 text-xl font-semibold tracking-tight">Operations dashboard</h1></div><p className="max-w-[45%] truncate text-sm text-[#718078]">{em}</p></div></header>
        <div className="mx-auto max-w-6xl p-5 lg:p-10">
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/sales" element={<SalesPage email={em}></SalesPage>} />
          {/* <Route path="/employees" element={<EmployeesPage email={em} />} /> */}
          <Route path="/history" element={<HistoryPage email={em} />} />
          <Route path="/charts" element={<ChartsPage email={em} />} />
          <Route path="/settings" element={<SettingsPage email={em}/>} />
        </Routes></div>
      </div>
    </div>
   
  );
};

export default FranchHome;