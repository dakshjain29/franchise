import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FranchHome from './FranchiseDash/FranchHome';
import LoginForm from './Forms/LoginForm';
import ApplicantDash from './OwnerDash/ApplicationDash';
import StartHomepage from './OwnerDash/StartHomepage';

// Placeholder components for each section

// Side Navigation component


// Main layout that combines sidebar with content area


// Root app component that sets up the router
const App = () => {
  return (
    <Router>
      
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<StartHomepage></StartHomepage>}></Route>
          <Route path="/login" element={<LoginForm></LoginForm>} />
          <Route path="/frDashboard/*" element={<FranchHome></FranchHome>} />
          <Route path="/ownerDashboard/*" element={<ApplicantDash></ApplicantDash>} />
          
        </Routes>
      </div>

    </Router>
  );
};

export default App;